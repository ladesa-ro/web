import { useInfiniteQuery } from '@tanstack/vue-query';
import type { IInfiniteListQueryConfig, QueryCallOptions } from './interfaces';

export interface IPaginatedResult {
  meta: { currentPage: number; totalPages: number };
}

export const createInfiniteListQuery = <
  TResult extends IPaginatedResult,
  TParams = unknown,
>(
  config: IInfiniteListQueryConfig<TResult, TParams>
) => {
  return (
    params?: MaybeRef<TParams | undefined>,
    options?: QueryCallOptions
  ) => {
    const query = useInfiniteQuery({
      queryKey: computed(() => [
        ...config.queryKey,
        'list-infinite',
        JSON.stringify(unref(params)),
      ]),
      queryFn: ({ pageParam }) =>
        config.fetcher({ ...unref(params), page: pageParam } as TParams & {
          page: number;
        }),
      getNextPageParam: last =>
        last.meta.currentPage < last.meta.totalPages
          ? last.meta.currentPage + 1
          : undefined,
      initialPageParam: 1,
    });

    if (options?.suspend !== false) {
      useQuerySuspend(query);
    }

    return query;
  };
};
