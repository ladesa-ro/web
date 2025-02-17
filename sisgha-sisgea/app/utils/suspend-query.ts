import type { UseQueryReturnType } from '@tanstack/vue-query';
import { wait } from './wait';

const __ARBITRARY_MAX_SILENT_WAIT = 30;

export enum QuerySuspenseBehaviourMode {
  ALWAYS_WAIT,
  NEVER_WAIT,
  SILENT_WAIT,
  AUTO,
}

export type QuerySuspenseBehaviour = {
  mode?: QuerySuspenseBehaviourMode;
};

export const suspendQuery = async (
  query: UseQueryReturnType<any, any>,
  suspenseBehaviour: QuerySuspenseBehaviour = {}
) => {
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
      consideredMode = QuerySuspenseBehaviourMode.ALWAYS_WAIT;
    } else {
      consideredMode = QuerySuspenseBehaviourMode.SILENT_WAIT;
    }
  }

  switch (consideredMode) {
    case QuerySuspenseBehaviourMode.ALWAYS_WAIT: {
      await doSuspense();
      break;
    }

    case QuerySuspenseBehaviourMode.SILENT_WAIT: {
      await Promise.race([doSuspense(), wait(__ARBITRARY_MAX_SILENT_WAIT)]);
      break;
    }

    default:
    case QuerySuspenseBehaviourMode.NEVER_WAIT: {
      break;
    }
  }
};
