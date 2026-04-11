import {
  createListQuery,
  createInfiniteListQuery,
  createFindOneQuery,
  createInvalidate,
  createImageBlobQuery,
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
  ImageBlobFn,
} from '~/composables/query-helpers';
import {
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
  createUploadImageFn,
} from './-helpers/crudHelpers';
import {
  ofertaFormacaoFindAll,
  ofertaFormacaoFindById,
  ofertaFormacaoCreate,
  ofertaFormacaoUpdate,
  ofertaFormacaoDeleteOneById,
  ofertaFormacaoUpdateImagemCapa,
  ofertaFormacaoGetImagemCapa,
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
  uploadCover: UploadCoverFn;
  imageCover: ImageBlobFn;
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

  const create = createCreateFn<
    ReqBody<OfertaFormacaoCreateData>,
    OfertaFormacaoCreateResponse
  >(api, ofertaFormacaoCreate);
  const update = createUpdateFn<
    ReqBody<OfertaFormacaoUpdateData>,
    OfertaFormacaoUpdateResponse
  >(api, ofertaFormacaoUpdate);
  const remove = createRemoveFn(api, ofertaFormacaoDeleteOneById);
  const uploadCover = createUploadImageFn(api, ofertaFormacaoUpdateImagemCapa);

  const imageCover = createImageBlobQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(ofertaFormacaoGetImagemCapa, { path: { id } }),
  });

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
    imageCover,
    invalidate,
  };
};
