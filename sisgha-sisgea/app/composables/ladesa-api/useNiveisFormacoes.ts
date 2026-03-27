import {
  createListQuery,
  createInfiniteListQuery,
  createFindOneQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  ListFn,
  ListInfiniteFn,
  FindOneFn,
  CreateFn,
  UpdateFn,
  RemoveFn,
  InvalidateFn,
} from '~/composables/query-helpers';
import type {
  NivelFormacaoFindAllData,
  NivelFormacaoFindAllResponse,
  NivelFormacaoFindByIdResponse,
  NivelFormacaoCreateData,
  NivelFormacaoCreateResponse,
  NivelFormacaoUpdateData,
  NivelFormacaoUpdateResponse,
} from '@ladesa-ro/web.api.client';

export type IUseNiveisFormacoes = {
  keys: readonly string[];
  list: ListFn<NivelFormacaoFindAllResponse, NivelFormacaoFindAllData>;
  listInfinite: ListInfiniteFn<
    NivelFormacaoFindAllResponse,
    NivelFormacaoFindAllData
  >;
  findOne: FindOneFn<NivelFormacaoFindByIdResponse>;
  create: CreateFn<
    NivelFormacaoCreateData['requestBody'],
    NivelFormacaoCreateResponse
  >;
  update: UpdateFn<
    NivelFormacaoUpdateData['requestBody'],
    NivelFormacaoUpdateResponse
  >;
  remove: RemoveFn;
  invalidate: InvalidateFn;
};

export const useNiveisFormacoes = (): IUseNiveisFormacoes => {
  const api = useApiClient();

  const keys = ['niveis-formacoes'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: NivelFormacaoFindAllData) =>
      api.niveisFormacoes.nivelFormacaoFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: NivelFormacaoFindAllData & { page: number }) =>
      api.niveisFormacoes.nivelFormacaoFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.niveisFormacoes.nivelFormacaoFindById({ id }),
  });

  const create = (data: NivelFormacaoCreateData['requestBody']) =>
    api.niveisFormacoes.nivelFormacaoCreate({ requestBody: data });

  const update = (id: string, data: NivelFormacaoUpdateData['requestBody']) =>
    api.niveisFormacoes.nivelFormacaoUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.niveisFormacoes.nivelFormacaoDeleteOneById({ id });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    update,
    remove,
    invalidate,
  };
};
