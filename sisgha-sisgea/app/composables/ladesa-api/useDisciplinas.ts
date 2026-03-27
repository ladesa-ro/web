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
import type {
  DisciplinaFindAllData,
  DisciplinaFindAllResponse,
  DisciplinaFindByIdResponse,
  DisciplinaCreateData,
  DisciplinaCreateResponse,
  DisciplinaUpdateData,
  DisciplinaUpdateResponse,
} from '@ladesa-ro/web.api.client';

export type IUseDisciplinas = {
  keys: readonly string[];
  list: ListFn<DisciplinaFindAllResponse, DisciplinaFindAllData>;
  listInfinite: ListInfiniteFn<
    DisciplinaFindAllResponse,
    DisciplinaFindAllData
  >;
  findOne: FindOneFn<DisciplinaFindByIdResponse>;
  create: CreateFn<
    DisciplinaCreateData['requestBody'],
    DisciplinaCreateResponse
  >;
  update: UpdateFn<
    DisciplinaUpdateData['requestBody'],
    DisciplinaUpdateResponse
  >;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  invalidate: InvalidateFn;
};

export const useDisciplinas = (): IUseDisciplinas => {
  const api = useApiClient();

  const keys = ['disciplinas'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: DisciplinaFindAllData) =>
      api.disciplinas.disciplinaFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: DisciplinaFindAllData & { page: number }) =>
      api.disciplinas.disciplinaFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.disciplinas.disciplinaFindById({ id }),
  });

  const create = (data: DisciplinaCreateData['requestBody']) =>
    api.disciplinas.disciplinaCreate({ requestBody: data });

  const update = (id: string, data: DisciplinaUpdateData['requestBody']) =>
    api.disciplinas.disciplinaUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.disciplinas.disciplinaDeleteOneById({ id });

  const uploadCover = (id: string, file: Blob) =>
    api.disciplinas.disciplinaUpdateImagemCapa({ id, formData: { file } });

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
