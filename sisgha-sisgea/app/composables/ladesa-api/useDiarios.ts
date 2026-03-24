import { createListQuery, createInfiniteListQuery, createFindOneQuery, createInvalidate } from '~/composables/query-helpers';
import type { ListFn, ListInfiniteFn, FindOneFn, CreateFn, UpdateFn, RemoveFn, InvalidateFn } from '~/composables/query-helpers';
import type {
  DiarioFindAllData,
  DiarioFindAllResponse,
  DiarioFindByIdResponse,
  DiarioCreateData,
  DiarioCreateResponse,
  DiarioUpdateData,
  DiarioUpdateResponse,
  DiarioProfessorFindAllData,
  DiarioProfessorFindAllResponse,
  DiarioProfessorBulkReplaceData,
  DiarioProfessorBulkReplaceResponse,
} from '~/helpers/api-client';

export type IUseDiarios = {
  keys: readonly string[];
  list: ListFn<DiarioFindAllResponse, DiarioFindAllData>;
  listInfinite: ListInfiniteFn<DiarioFindAllResponse, DiarioFindAllData>;
  findOne: FindOneFn<DiarioFindByIdResponse>;
  create: CreateFn<DiarioCreateData['requestBody'], DiarioCreateResponse>;
  update: UpdateFn<DiarioUpdateData['requestBody'], DiarioUpdateResponse>;
  remove: RemoveFn;
  listProfessores: ListFn<DiarioProfessorFindAllResponse, DiarioProfessorFindAllData>;
  bulkReplaceProfessores: (data: DiarioProfessorBulkReplaceData) => Promise<DiarioProfessorBulkReplaceResponse>;
  invalidate: InvalidateFn;
};

export const useDiarios = (): IUseDiarios => {
  const api = useApiClient();

  const keys = ['diarios'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: DiarioFindAllData) =>
      api.diarios.diarioFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: DiarioFindAllData & { page: number }) =>
      api.diarios.diarioFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.diarios.diarioFindById({ id }),
  });

  const create = (data: DiarioCreateData['requestBody']) =>
    api.diarios.diarioCreate({ requestBody: data });

  const update = (id: string, data: DiarioUpdateData['requestBody']) =>
    api.diarios.diarioUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.diarios.diarioDeleteOneById({ id });

  // Métodos custom — professores do diário
  const listProfessores = createListQuery({
    queryKey: [...keys, 'professores'],
    fetcher: (params?: DiarioProfessorFindAllData) =>
      api.diarios.diarioProfessorFindAll(params!),
  });

  const bulkReplaceProfessores = (data: DiarioProfessorBulkReplaceData) =>
    api.diarios.diarioProfessorBulkReplace(data);

  const invalidate = createInvalidate(keys);

  return {
    keys, list, listInfinite, findOne, create, update, remove,
    listProfessores, bulkReplaceProfessores, invalidate,
  };
};
