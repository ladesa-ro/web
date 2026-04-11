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
  disciplinaFindAll,
  disciplinaFindById,
  disciplinaCreate,
  disciplinaUpdate,
  disciplinaDeleteOneById,
  disciplinaUpdateImagemCapa,
  disciplinaGetImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  DisciplinaFindAllData,
  DisciplinaFindAllResponse,
  DisciplinaFindByIdResponse,
  DisciplinaCreateData,
  DisciplinaCreateResponse,
  DisciplinaUpdateData,
  DisciplinaUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseDisciplinas = {
  keys: readonly string[];
  list: ListFn<DisciplinaFindAllResponse, ReqQuery<DisciplinaFindAllData>>;
  listInfinite: ListInfiniteFn<
    DisciplinaFindAllResponse,
    ReqQuery<DisciplinaFindAllData>
  >;
  findOne: FindOneFn<DisciplinaFindByIdResponse>;
  create: CreateFn<ReqBody<DisciplinaCreateData>, DisciplinaCreateResponse>;
  update: UpdateFn<ReqBody<DisciplinaUpdateData>, DisciplinaUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  imageCover: ImageBlobFn;
  invalidate: InvalidateFn;
};

export const useDisciplinas = (): IUseDisciplinas => {
  const api = useApiClient();

  const keys = ['disciplinas'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<DisciplinaFindAllData>) =>
      api.call(disciplinaFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<DisciplinaFindAllData>) =>
      api.call(disciplinaFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(disciplinaFindById, { path: { id } }),
  });

  const create = createCreateFn<
    ReqBody<DisciplinaCreateData>,
    DisciplinaCreateResponse
  >(api, disciplinaCreate);
  const update = createUpdateFn<
    ReqBody<DisciplinaUpdateData>,
    DisciplinaUpdateResponse
  >(api, disciplinaUpdate);
  const remove = createRemoveFn(api, disciplinaDeleteOneById);
  const uploadCover = createUploadImageFn(api, disciplinaUpdateImagemCapa);

  const imageCover = createImageBlobQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(disciplinaGetImagemCapa, { path: { id } }),
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
