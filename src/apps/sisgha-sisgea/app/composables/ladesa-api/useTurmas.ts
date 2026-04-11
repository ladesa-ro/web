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
  turmaFindAll,
  turmaFindById,
  turmaCreate,
  turmaUpdate,
  turmaDeleteOneById,
  turmaUpdateImagemCapa,
  turmaGetImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  TurmaFindAllData,
  TurmaFindAllResponse,
  TurmaFindByIdResponse,
  TurmaCreateData,
  TurmaCreateResponse,
  TurmaUpdateData,
  TurmaUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseTurmas = {
  keys: readonly string[];
  list: ListFn<TurmaFindAllResponse, ReqQuery<TurmaFindAllData>>;
  listInfinite: ListInfiniteFn<
    TurmaFindAllResponse,
    ReqQuery<TurmaFindAllData>
  >;
  findOne: FindOneFn<TurmaFindByIdResponse>;
  create: CreateFn<ReqBody<TurmaCreateData>, TurmaCreateResponse>;
  update: UpdateFn<ReqBody<TurmaUpdateData>, TurmaUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  imageCover: ImageBlobFn;
  invalidate: InvalidateFn;
};

export const useTurmas = (): IUseTurmas => {
  const api = useApiClient();

  const keys = ['turmas'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<TurmaFindAllData>) =>
      api.call(turmaFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<TurmaFindAllData>) =>
      api.call(turmaFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(turmaFindById, { path: { id } }),
  });

  const create = createCreateFn<ReqBody<TurmaCreateData>, TurmaCreateResponse>(
    api,
    turmaCreate
  );
  const update = createUpdateFn<ReqBody<TurmaUpdateData>, TurmaUpdateResponse>(
    api,
    turmaUpdate
  );
  const remove = createRemoveFn(api, turmaDeleteOneById);
  const uploadCover = createUploadImageFn(api, turmaUpdateImagemCapa);

  const imageCover = createImageBlobQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(turmaGetImagemCapa, { path: { id } }),
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
