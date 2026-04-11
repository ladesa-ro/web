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
  cursoFindAll,
  cursoFindById,
  cursoCreate,
  cursoUpdate,
  cursoDeleteOneById,
  cursoUpdateImagemCapa,
  cursoGetImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  CursoFindAllData,
  CursoFindAllResponse,
  CursoFindByIdResponse,
  CursoCreateData,
  CursoCreateResponse,
  CursoUpdateData,
  CursoUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseCursos = {
  keys: readonly string[];
  list: ListFn<CursoFindAllResponse, ReqQuery<CursoFindAllData>>;
  listInfinite: ListInfiniteFn<
    CursoFindAllResponse,
    ReqQuery<CursoFindAllData>
  >;
  findOne: FindOneFn<CursoFindByIdResponse>;
  create: CreateFn<ReqBody<CursoCreateData>, CursoCreateResponse>;
  update: UpdateFn<ReqBody<CursoUpdateData>, CursoUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  imageCover: ImageBlobFn;
  invalidate: InvalidateFn;
};

export const useCursos = (): IUseCursos => {
  const api = useApiClient();

  const keys = ['cursos'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<CursoFindAllData>) =>
      api.call(cursoFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<CursoFindAllData>) =>
      api.call(cursoFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(cursoFindById, { path: { id } }),
  });

  const create = createCreateFn<ReqBody<CursoCreateData>, CursoCreateResponse>(
    api,
    cursoCreate
  );
  const update = createUpdateFn<ReqBody<CursoUpdateData>, CursoUpdateResponse>(
    api,
    cursoUpdate
  );
  const remove = createRemoveFn(api, cursoDeleteOneById);
  const uploadCover = createUploadImageFn(api, cursoUpdateImagemCapa);

  const imageCover = createImageBlobQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(cursoGetImagemCapa, { path: { id } }),
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
