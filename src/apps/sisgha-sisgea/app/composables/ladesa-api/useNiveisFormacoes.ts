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
  UploadCoverFn,
} from '~/composables/query-helpers';
import {
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
  createUploadImageFn,
} from './-helpers/crudHelpers';
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
  uploadCover: UploadCoverFn;
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

  const create = createCreateFn<
    ReqBody<NivelFormacaoCreateData>,
    NivelFormacaoCreateResponse
  >(api, nivelFormacaoCreate);
  const update = createUpdateFn<
    ReqBody<NivelFormacaoUpdateData>,
    NivelFormacaoUpdateResponse
  >(api, nivelFormacaoUpdate);
  const remove = createRemoveFn(api, nivelFormacaoDeleteOneById);
  const uploadCover = createUploadImageFn(api, nivelFormacaoUpdateImagemCapa);

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
