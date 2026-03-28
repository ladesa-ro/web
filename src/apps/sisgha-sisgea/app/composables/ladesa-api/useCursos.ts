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
  cursoFindAll,
  cursoFindById,
  cursoCreate,
  cursoUpdate,
  cursoDeleteOneById,
  cursoUpdateImagemCapa,
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

  const create = (data: ReqBody<CursoCreateData>) =>
    api.call(cursoCreate, { body: data });

  const update = (id: string, data: ReqBody<CursoUpdateData>) =>
    api.call(cursoUpdate, { path: { id }, body: data });

  const remove = (id: string) => api.call(cursoDeleteOneById, { path: { id } });

  const uploadCover = (id: string, file: Blob) =>
    api.call(cursoUpdateImagemCapa, { path: { id }, body: { file } });

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
