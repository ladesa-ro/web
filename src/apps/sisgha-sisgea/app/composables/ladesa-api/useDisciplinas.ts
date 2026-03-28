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
  disciplinaFindAll,
  disciplinaFindById,
  disciplinaCreate,
  disciplinaUpdate,
  disciplinaDeleteOneById,
  disciplinaUpdateImagemCapa,
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

  const create = (data: ReqBody<DisciplinaCreateData>) =>
    api.call(disciplinaCreate, { body: data });

  const update = (id: string, data: ReqBody<DisciplinaUpdateData>) =>
    api.call(disciplinaUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(disciplinaDeleteOneById, { path: { id } });

  const uploadCover = (id: string, file: Blob) =>
    api.call(disciplinaUpdateImagemCapa, { path: { id }, body: { file } });

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
