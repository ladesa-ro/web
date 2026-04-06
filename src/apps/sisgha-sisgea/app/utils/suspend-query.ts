import { wait } from '@ladesa-ro/web.utils';

const OPTIMISTIC_TIMEOUT_MS = 200;

export enum QuerySuspenseBehaviourMode {
  WAIT_UNTIL_FINISH,
  NEVER,
  OPTIMISTIC,
  AUTO,
}

export type QuerySuspenseBehaviour = {
  mode?: QuerySuspenseBehaviourMode;
};

/** Tipo mínimo que representa uma query suspendível (compatível com UseQueryReturnType e UseInfiniteQueryReturnType). */
export type SuspendableQuery = {
  suspense: () => Promise<unknown>;
  isEnabled: Ref<boolean>;
};

export const suspendQuery = async (
  query: SuspendableQuery,
  suspenseBehaviour: QuerySuspenseBehaviour = {}
) => {
  if (!unref(query.isEnabled)) return;

  const { mode = QuerySuspenseBehaviourMode.AUTO } = suspenseBehaviour;

  const doSuspense = () => {
    return query.suspense().catch(err => {
      console.trace();
      console.error('err', err);
    });
  };

  let consideredMode = mode;

  if (consideredMode === QuerySuspenseBehaviourMode.AUTO) {
    if (import.meta.server) {
      consideredMode = QuerySuspenseBehaviourMode.WAIT_UNTIL_FINISH;
    } else {
      consideredMode = QuerySuspenseBehaviourMode.OPTIMISTIC;
    }
  }

  switch (consideredMode) {
    case QuerySuspenseBehaviourMode.WAIT_UNTIL_FINISH: {
      await doSuspense();
      break;
    }

    case QuerySuspenseBehaviourMode.OPTIMISTIC: {
      await Promise.race([doSuspense(), wait(OPTIMISTIC_TIMEOUT_MS)]);
      break;
    }

    default:
    case QuerySuspenseBehaviourMode.NEVER: {
      break;
    }
  }
};
