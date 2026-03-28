import {
  createFindOneQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  FindOneFn,
  InvalidateFn,
} from '~/composables/query-helpers';
import { perfilFindById } from '@ladesa-ro/web.api.client';
import type { PerfilFindByIdResponse } from '@ladesa-ro/web.api.client';

export type IUsePerfis = {
  keys: readonly string[];
  findOne: FindOneFn<PerfilFindByIdResponse>;
  invalidate: InvalidateFn;
};

export const usePerfis = (): IUsePerfis => {
  const api = useApiClient();

  const keys = ['perfis'] as const;

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(perfilFindById, { path: { id } }),
  });

  const invalidate = createInvalidate(keys);

  return { keys, findOne, invalidate };
};
