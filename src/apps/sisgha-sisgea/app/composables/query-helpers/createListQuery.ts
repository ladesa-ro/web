import { useQuery } from '@tanstack/vue-query';
import type { IListQueryConfig } from './interfaces';

export const createListQuery = <TResult, TParams = unknown>(
  config: IListQueryConfig<TResult, TParams>
) => {
  return (params?: MaybeRef<TParams | undefined>) => {
    const queryKey = computed(() => [
      ...config.queryKey,
      'list',
      JSON.stringify(unref(params)),
    ]);

    return useQuery({
      queryKey: queryKey,
      queryFn: () => config.fetcher(unref(params)),
    });
  };
};
