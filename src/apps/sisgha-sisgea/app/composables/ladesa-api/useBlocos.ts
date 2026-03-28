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
  blocoFindAll,
  blocoFindById,
  blocoCreate,
  blocoUpdate,
  blocoDeleteOneById,
  blocoUpdateImagemCapa,
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

  const create = (data: ReqBody<BlocoCreateData>) =>
    api.call(blocoCreate, { body: data });

  const update = (id: string, data: ReqBody<BlocoUpdateData>) =>
    api.call(blocoUpdate, { path: { id }, body: data });

  const remove = (id: string) => api.call(blocoDeleteOneById, { path: { id } });

  const uploadCover = (id: string, file: Blob) => {
    return api.call(blocoUpdateImagemCapa, { path: { id }, body: { file } });
  };

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
