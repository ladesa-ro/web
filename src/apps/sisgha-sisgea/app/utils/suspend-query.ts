import { wait } from '@ladesa-ro/web.utils';
import type { UseQueryReturnType } from '@tanstack/vue-query';

const OPTIMISTIC_TIMEOUT_MS = 50;

export enum QuerySuspenseBehaviourMode {
  WAIT_UNTIL_FINISH,
  NEVER,
  OPTIMISTIC,
  AUTO,
}

export type QuerySuspenseBehaviour = {
  mode?: QuerySuspenseBehaviourMode;
};

export const suspendQuery = async (
  query: UseQueryReturnType<any, any>,
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
