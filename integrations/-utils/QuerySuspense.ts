import type { UseQueryReturnType } from '@tanstack/vue-query';
import { wait } from './wait';

export enum QuerySuspenseBehaviourMode {
  AWALWAYS_WAIT,
  NEVER_WAIT,
  SILENT_WAIT,
  AUTO,
}

export type QuerySuspenseBehaviour = {
  mode?: QuerySuspenseBehaviourMode;
};

const __ARBITRARY_MAX_SILENT_WAIT = 30;

export const QuerySuspense = async (
  query: UseQueryReturnType<any, any>,
  suspenseBehaviour: QuerySuspenseBehaviour = {}
) => {
  const { mode = QuerySuspenseBehaviourMode.AUTO } = suspenseBehaviour;

  const doSuspense = () => query.suspense().finally(() => {});

  let consideredMode = mode;

  if (consideredMode === QuerySuspenseBehaviourMode.AUTO) {
    if (import.meta.server) {
      consideredMode = QuerySuspenseBehaviourMode.AWALWAYS_WAIT;
    } else {
      consideredMode = QuerySuspenseBehaviourMode.SILENT_WAIT;
    }
  }

  switch (consideredMode) {
    case QuerySuspenseBehaviourMode.AWALWAYS_WAIT: {
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
