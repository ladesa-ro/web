import { createListQuery, createInfiniteListQuery, createFindOneQuery, createInvalidate } from '~/composables/query-helpers';
import type { ListFn, ListInfiniteFn, FindOneFn, CreateFn, UpdateFn, RemoveFn, InvalidateFn, UploadCoverFn } from '~/composables/query-helpers';
import type {
  CursoFindAllData,
  CursoFindAllResponse,
  CursoFindByIdResponse,
  CursoCreateData,
  CursoCreateResponse,
  CursoUpdateData,
  CursoUpdateResponse,
} from '~/helpers/api-client';

export type IUseCursos = {
  keys: readonly string[];
  list: ListFn<CursoFindAllResponse, CursoFindAllData>;
  listInfinite: ListInfiniteFn<CursoFindAllResponse, CursoFindAllData>;
  findOne: FindOneFn<CursoFindByIdResponse>;
  create: CreateFn<CursoCreateData['requestBody'], CursoCreateResponse>;
  update: UpdateFn<CursoUpdateData['requestBody'], CursoUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  invalidate: InvalidateFn;
};

export const useCursos = (): IUseCursos => {
  const api = useApiClient();

  const keys = ['cursos'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: CursoFindAllData) =>
      api.cursos.cursoFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: CursoFindAllData & { page: number }) =>
      api.cursos.cursoFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.cursos.cursoFindById({ id }),
  });

  const create = (data: CursoCreateData['requestBody']) =>
    api.cursos.cursoCreate({ requestBody: data });

  const update = (id: string, data: CursoUpdateData['requestBody']) =>
    api.cursos.cursoUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.cursos.cursoDeleteOneById({ id });

  const uploadCover = (id: string, file: Blob) =>
    api.cursos.cursoUpdateImagemCapa({ id, formData: { file } });

  const invalidate = createInvalidate(keys);

  return { keys, list, listInfinite, findOne, create, update, remove, uploadCover, invalidate };
};
