import { useQuery } from '@tanstack/vue-query';
import type { IFindOneQueryConfig } from './interfaces';

export const createFindOneQuery = <TResult>(
  config: IFindOneQueryConfig<TResult>
) => {
  return (id: MaybeRef<string | null>) =>
    useQuery({
      queryKey: computed(() => [...config.queryKey, 'detail', unref(id)]),
      queryFn: () => config.fetcher(unref(id)!),
      enabled: computed(() => !!unref(id)),
    });
};
