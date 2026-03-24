import { useQuery } from '@tanstack/vue-query';
import type { IListQueryConfig } from './interfaces';

export const createListQuery = <TResult, TParams = unknown>(
  config: IListQueryConfig<TResult, TParams>
) => {
  return (params?: MaybeRef<TParams>) =>
    useQuery({
      queryKey: computed(() => [
        ...config.queryKey,
        'list',
        JSON.stringify(unref(params)),
      ]),
      queryFn: () => config.fetcher(unref(params)),
    });
};
