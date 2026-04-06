import { useQuery } from '@tanstack/vue-query';
import type { IFindOneQueryConfig, QueryCallOptions } from './interfaces';

export const createFindOneQuery = <TResult>(
  config: IFindOneQueryConfig<TResult>
) => {
  return (id: MaybeRef<string | null>, options?: QueryCallOptions) => {
    const query = useQuery({
      queryKey: computed(() => [...config.queryKey, 'detail', unref(id)]),
      queryFn: () => config.fetcher(unref(id)!),
      enabled: computed(() => !!unref(id)),
    });

    if (options?.suspend !== false) {
      useQuerySuspend(query);
    }

    return query;
  };
};
