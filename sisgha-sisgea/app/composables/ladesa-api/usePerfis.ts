import {
  createListQuery,
  createFindOneQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  ListFn,
  FindOneFn,
  InvalidateFn,
} from '~/composables/query-helpers';
import type {
  PerfilFindAllData,
  PerfilFindAllResponse,
  PerfilFindByIdResponse,
} from '@ladesa-ro/web.api.client';

export type IUsePerfis = {
  keys: readonly string[];
  list: ListFn<PerfilFindAllResponse, PerfilFindAllData>;
  findOne: FindOneFn<PerfilFindByIdResponse>;
  invalidate: InvalidateFn;
};

export const usePerfis = (): IUsePerfis => {
  const api = useApiClient();

  const keys = ['perfis'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: PerfilFindAllData) =>
      api.usuarios.perfilFindAll(params as any),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.usuarios.perfilFindById({ id } as any),
  });

  const invalidate = createInvalidate(keys);

  return { keys, list, findOne, invalidate };
};
