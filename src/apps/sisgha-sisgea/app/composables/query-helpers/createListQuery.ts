import { useQuery } from '@tanstack/vue-query';
import type { IListQueryConfig, QueryCallOptions } from './interfaces';

export const createListQuery = <TResult, TParams = unknown>(
  config: IListQueryConfig<TResult, TParams>
) => {
  return (
    params?: MaybeRef<TParams | undefined>,
    options?: QueryCallOptions
  ) => {
    const queryKey = computed(() => [
      ...config.queryKey,
      'list',
      JSON.stringify(unref(params)),
    ]);

    const query = useQuery({
      queryKey: queryKey,
      queryFn: () => config.fetcher(unref(params)),
    });

    if (options?.suspend !== false) {
      useQuerySuspend(query);
    }

    return query;
  };
};
