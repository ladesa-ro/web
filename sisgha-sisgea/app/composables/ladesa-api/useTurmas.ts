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
  TurmaFindAllData,
  TurmaFindAllResponse,
  TurmaFindByIdResponse,
  TurmaCreateData,
  TurmaCreateResponse,
  TurmaUpdateData,
  TurmaUpdateResponse,
} from '@ladesa-ro/web.api.client';

export type IUseTurmas = {
  keys: readonly string[];
  list: ListFn<TurmaFindAllResponse, TurmaFindAllData>;
  listInfinite: ListInfiniteFn<TurmaFindAllResponse, TurmaFindAllData>;
  findOne: FindOneFn<TurmaFindByIdResponse>;
  create: CreateFn<TurmaCreateData['requestBody'], TurmaCreateResponse>;
  update: UpdateFn<TurmaUpdateData['requestBody'], TurmaUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  invalidate: InvalidateFn;
};

export const useTurmas = (): IUseTurmas => {
  const api = useApiClient();

  const keys = ['turmas'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: TurmaFindAllData) => api.turmas.turmaFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: TurmaFindAllData & { page: number }) =>
      api.turmas.turmaFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.turmas.turmaFindById({ id }),
  });

  const create = (data: TurmaCreateData['requestBody']) =>
    api.turmas.turmaCreate({ requestBody: data });

  const update = (id: string, data: TurmaUpdateData['requestBody']) =>
    api.turmas.turmaUpdate({ id, requestBody: data });

  const remove = (id: string) => api.turmas.turmaDeleteOneById({ id });

  const uploadCover = (id: string, file: Blob) =>
    api.turmas.turmaUpdateImagemCapa({ id, formData: { file } });

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
