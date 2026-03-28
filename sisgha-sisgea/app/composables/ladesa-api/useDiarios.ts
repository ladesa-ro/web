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
} from '~/composables/query-helpers';
import {
  diarioFindAll,
  diarioFindById,
  diarioCreate,
  diarioUpdate,
  diarioDeleteOneById,
  diarioProfessorFindAll,
  diarioProfessorBulkReplace,
} from '@ladesa-ro/web.api.client';
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
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseDiarios = {
  keys: readonly string[];
  list: ListFn<DiarioFindAllResponse, ReqQuery<DiarioFindAllData>>;
  listInfinite: ListInfiniteFn<DiarioFindAllResponse, ReqQuery<DiarioFindAllData>>;
  findOne: FindOneFn<DiarioFindByIdResponse>;
  create: CreateFn<ReqBody<DiarioCreateData>, DiarioCreateResponse>;
  update: UpdateFn<ReqBody<DiarioUpdateData>, DiarioUpdateResponse>;
  remove: RemoveFn;
  listProfessores: (diarioId: string, params?: MaybeRef<ReqQuery<DiarioProfessorFindAllData>>) => ReturnType<ListFn<DiarioProfessorFindAllResponse, ReqQuery<DiarioProfessorFindAllData>>>;
  bulkReplaceProfessores: (
    diarioId: string,
    data: ReqBody<DiarioProfessorBulkReplaceData>
  ) => Promise<DiarioProfessorBulkReplaceResponse>;
  invalidate: InvalidateFn;
};

export const useDiarios = (): IUseDiarios => {
  const api = useApiClient();

  const keys = ['diarios'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<DiarioFindAllData>) =>
      api.call(diarioFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<DiarioFindAllData>) =>
      api.call(diarioFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(diarioFindById, { path: { id } }),
  });

  const create = (data: ReqBody<DiarioCreateData>) =>
    api.call(diarioCreate, { body: data });

  const update = (id: string, data: ReqBody<DiarioUpdateData>) =>
    api.call(diarioUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(diarioDeleteOneById, { path: { id } });

  const listProfessores = (diarioId: string, params?: MaybeRef<ReqQuery<DiarioProfessorFindAllData>>) =>
    createListQuery({
      queryKey: [...keys, diarioId, 'professores'],
      fetcher: (query?: ReqQuery<DiarioProfessorFindAllData>) =>
        api.call(diarioProfessorFindAll, { path: { diarioId }, query }),
    })(params);

  const bulkReplaceProfessores = (diarioId: string, data: ReqBody<DiarioProfessorBulkReplaceData>) =>
    api.call(diarioProfessorBulkReplace, { path: { diarioId }, body: data });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    update,
    remove,
    listProfessores,
    bulkReplaceProfessores,
    invalidate,
  };
};
