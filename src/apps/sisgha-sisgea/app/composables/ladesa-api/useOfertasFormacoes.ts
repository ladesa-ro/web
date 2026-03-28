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
import {
  ofertaFormacaoFindAll,
  ofertaFormacaoFindById,
  ofertaFormacaoCreate,
  ofertaFormacaoUpdate,
  ofertaFormacaoDeleteOneById,
} from '@ladesa-ro/web.api.client';
import type {
  OfertaFormacaoFindAllData,
  OfertaFormacaoFindAllResponse,
  OfertaFormacaoFindByIdResponse,
  OfertaFormacaoCreateData,
  OfertaFormacaoCreateResponse,
  OfertaFormacaoUpdateData,
  OfertaFormacaoUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseOfertasFormacoes = {
  keys: readonly string[];
  list: ListFn<
    OfertaFormacaoFindAllResponse,
    ReqQuery<OfertaFormacaoFindAllData>
  >;
  listInfinite: ListInfiniteFn<
    OfertaFormacaoFindAllResponse,
    ReqQuery<OfertaFormacaoFindAllData>
  >;
  findOne: FindOneFn<OfertaFormacaoFindByIdResponse>;
  create: CreateFn<
    ReqBody<OfertaFormacaoCreateData>,
    OfertaFormacaoCreateResponse
  >;
  update: UpdateFn<
    ReqBody<OfertaFormacaoUpdateData>,
    OfertaFormacaoUpdateResponse
  >;
  remove: RemoveFn;
  invalidate: InvalidateFn;
};

export const useOfertasFormacoes = (): IUseOfertasFormacoes => {
  const api = useApiClient();

  const keys = ['ofertas-formacoes'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<OfertaFormacaoFindAllData>) =>
      api.call(ofertaFormacaoFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<OfertaFormacaoFindAllData>) =>
      api.call(ofertaFormacaoFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(ofertaFormacaoFindById, { path: { id } }),
  });

  const create = (data: ReqBody<OfertaFormacaoCreateData>) =>
    api.call(ofertaFormacaoCreate, { body: data });

  const update = (id: string, data: ReqBody<OfertaFormacaoUpdateData>) =>
    api.call(ofertaFormacaoUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(ofertaFormacaoDeleteOneById, { path: { id } });

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
