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
  nivelFormacaoFindAll,
  nivelFormacaoFindById,
  nivelFormacaoCreate,
  nivelFormacaoUpdate,
  nivelFormacaoDeleteOneById,
  nivelFormacaoUpdateImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  NivelFormacaoFindAllData,
  NivelFormacaoFindAllResponse,
  NivelFormacaoFindByIdResponse,
  NivelFormacaoCreateData,
  NivelFormacaoCreateResponse,
  NivelFormacaoUpdateData,
  NivelFormacaoUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseNiveisFormacoes = {
  keys: readonly string[];
  list: ListFn<
    NivelFormacaoFindAllResponse,
    ReqQuery<NivelFormacaoFindAllData>
  >;
  listInfinite: ListInfiniteFn<
    NivelFormacaoFindAllResponse,
    ReqQuery<NivelFormacaoFindAllData>
  >;
  findOne: FindOneFn<NivelFormacaoFindByIdResponse>;
  create: CreateFn<
    ReqBody<NivelFormacaoCreateData>,
    NivelFormacaoCreateResponse
  >;
  update: UpdateFn<
    ReqBody<NivelFormacaoUpdateData>,
    NivelFormacaoUpdateResponse
  >;
  remove: RemoveFn;
  uploadCover: (id: string, file: Blob) => Promise<any>;
  invalidate: InvalidateFn;
};

export const useNiveisFormacoes = (): IUseNiveisFormacoes => {
  const api = useApiClient();

  const keys = ['niveis-formacoes'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<NivelFormacaoFindAllData>) =>
      api.call(nivelFormacaoFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<NivelFormacaoFindAllData>) =>
      api.call(nivelFormacaoFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(nivelFormacaoFindById, { path: { id } }),
  });

  const create = (data: ReqBody<NivelFormacaoCreateData>) =>
    api.call(nivelFormacaoCreate, { body: data });

  const update = (id: string, data: ReqBody<NivelFormacaoUpdateData>) =>
    api.call(nivelFormacaoUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(nivelFormacaoDeleteOneById, { path: { id } });

  const uploadCover = (id: string, file: Blob) =>
    api.call(nivelFormacaoUpdateImagemCapa, { path: { id }, body: { file } });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    update,
    remove,
    uploadCover,
    invalidate,
  };
};
