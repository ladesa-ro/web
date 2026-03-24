import { createListQuery, createInfiniteListQuery, createFindOneQuery, createInvalidate } from '~/composables/query-helpers';
import type { ListFn, ListInfiniteFn, FindOneFn, CreateFn, UpdateFn, RemoveFn, InvalidateFn } from '~/composables/query-helpers';
import type {
  OfertaFormacaoFindAllData,
  OfertaFormacaoFindAllResponse,
  OfertaFormacaoFindByIdResponse,
  OfertaFormacaoCreateData,
  OfertaFormacaoCreateResponse,
  OfertaFormacaoUpdateData,
  OfertaFormacaoUpdateResponse,
} from '~/helpers/api-client';

export type IUseOfertasFormacoes = {
  keys: readonly string[];
  list: ListFn<OfertaFormacaoFindAllResponse, OfertaFormacaoFindAllData>;
  listInfinite: ListInfiniteFn<OfertaFormacaoFindAllResponse, OfertaFormacaoFindAllData>;
  findOne: FindOneFn<OfertaFormacaoFindByIdResponse>;
  create: CreateFn<OfertaFormacaoCreateData['requestBody'], OfertaFormacaoCreateResponse>;
  update: UpdateFn<OfertaFormacaoUpdateData['requestBody'], OfertaFormacaoUpdateResponse>;
  remove: RemoveFn;
  invalidate: InvalidateFn;
};

export const useOfertasFormacoes = (): IUseOfertasFormacoes => {
  const api = useApiClient();

  const keys = ['ofertas-formacoes'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: OfertaFormacaoFindAllData) =>
      api.ofertasFormacoes.ofertaFormacaoFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: OfertaFormacaoFindAllData & { page: number }) =>
      api.ofertasFormacoes.ofertaFormacaoFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.ofertasFormacoes.ofertaFormacaoFindById({ id }),
  });

  const create = (data: OfertaFormacaoCreateData['requestBody']) =>
    api.ofertasFormacoes.ofertaFormacaoCreate({ requestBody: data });

  const update = (id: string, data: OfertaFormacaoUpdateData['requestBody']) =>
    api.ofertasFormacoes.ofertaFormacaoUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.ofertasFormacoes.ofertaFormacaoDeleteOneById({ id });

  const invalidate = createInvalidate(keys);

  return { keys, list, listInfinite, findOne, create, update, remove, invalidate };
};
