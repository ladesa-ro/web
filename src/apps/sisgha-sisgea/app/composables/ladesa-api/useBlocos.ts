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
  blocoFindAll,
  blocoFindById,
  blocoCreate,
  blocoUpdate,
  blocoDeleteOneById,
  blocoUpdateImagemCapa,
  blocoGetImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  BlocoFindAllData,
  BlocoFindAllResponse,
  BlocoFindByIdResponse,
  BlocoCreateData,
  BlocoCreateResponse,
  BlocoUpdateData,
  BlocoUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseBlocos = {
  keys: readonly string[];
  list: ListFn<BlocoFindAllResponse, ReqQuery<BlocoFindAllData>>;
  listInfinite: ListInfiniteFn<
    BlocoFindAllResponse,
    ReqQuery<BlocoFindAllData>
  >;
  findOne: FindOneFn<BlocoFindByIdResponse>;
  create: CreateFn<ReqBody<BlocoCreateData>, BlocoCreateResponse>;
  update: UpdateFn<ReqBody<BlocoUpdateData>, BlocoUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  imageCover: ImageBlobFn;
  invalidate: InvalidateFn;
};

export const useBlocos = (): IUseBlocos => {
  const api = useApiClient();

  const keys = ['blocos'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<BlocoFindAllData>) =>
      api.call(blocoFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<BlocoFindAllData>) =>
      api.call(blocoFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(blocoFindById, { path: { id } }),
  });

  const create = createCreateFn<ReqBody<BlocoCreateData>, BlocoCreateResponse>(
    api,
    blocoCreate
  );
  const update = createUpdateFn<ReqBody<BlocoUpdateData>, BlocoUpdateResponse>(
    api,
    blocoUpdate
  );
  const remove = createRemoveFn(api, blocoDeleteOneById);
  const uploadCover = createUploadImageFn(api, blocoUpdateImagemCapa);

  const imageCover = createImageBlobQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(blocoGetImagemCapa, { path: { id } }),
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
