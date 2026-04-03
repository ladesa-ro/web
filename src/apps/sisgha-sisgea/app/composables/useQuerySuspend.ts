import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { QuerySuspenseBehaviour } from '~/utils';
import { QuerySuspenseBehaviourMode, suspendQuery } from '~/utils';

export const useQuerySuspend = (query: UseQueryReturnType<any, any>) => {
  const suspend = (suspenseBehaviour: QuerySuspenseBehaviour = {}) => {
    return suspendQuery(query, suspenseBehaviour);
  };

  onServerPrefetch(async () => {
    await suspend({ mode: QuerySuspenseBehaviourMode.WAIT_UNTIL_FINISH });
  });

  return suspend;
};
