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
  diarioFindAll,
  diarioFindById,
  diarioCreate,
  diarioBatchCreate,
  diarioUpdate,
  diarioDeleteOneById,
  diarioProfessorFindAll,
  diarioProfessorBulkReplace,
  diarioPreferenciaAgrupamentoFindAll,
  diarioPreferenciaAgrupamentoBulkReplace,
  diarioUpdateImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  DiarioFindAllData,
  DiarioFindAllResponse,
  DiarioFindByIdResponse,
  DiarioCreateData,
  DiarioCreateResponse,
  DiarioBatchCreateData,
  DiarioBatchCreateResponse,
  DiarioUpdateData,
  DiarioUpdateResponse,
  DiarioProfessorFindAllData,
  DiarioProfessorFindAllResponse,
  DiarioProfessorBulkReplaceData,
  DiarioProfessorBulkReplaceResponse,
  DiarioPreferenciaAgrupamentoFindAllData,
  DiarioPreferenciaAgrupamentoFindAllResponse,
  DiarioPreferenciaAgrupamentoBulkReplaceData,
  DiarioPreferenciaAgrupamentoBulkReplaceResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseDiarios = {
  keys: readonly string[];
  list: ListFn<DiarioFindAllResponse, ReqQuery<DiarioFindAllData>>;
  listInfinite: ListInfiniteFn<
    DiarioFindAllResponse,
    ReqQuery<DiarioFindAllData>
  >;
  findOne: FindOneFn<DiarioFindByIdResponse>;
  create: CreateFn<ReqBody<DiarioCreateData>, DiarioCreateResponse>;
  batchCreate: (
    data: ReqBody<DiarioBatchCreateData>
  ) => Promise<DiarioBatchCreateResponse>;
  update: UpdateFn<ReqBody<DiarioUpdateData>, DiarioUpdateResponse>;
  remove: RemoveFn;
  listProfessores: (
    diarioId: string,
    params?: MaybeRef<ReqQuery<DiarioProfessorFindAllData>>
  ) => ReturnType<
    ListFn<DiarioProfessorFindAllResponse, ReqQuery<DiarioProfessorFindAllData>>
  >;
  bulkReplaceProfessores: (
    diarioId: string,
    data: ReqBody<DiarioProfessorBulkReplaceData>
  ) => Promise<DiarioProfessorBulkReplaceResponse>;
  listPreferenciasAgrupamento: (
    diarioId: string,
    params?: MaybeRef<ReqQuery<DiarioPreferenciaAgrupamentoFindAllData>>
  ) => ReturnType<
    ListFn<DiarioPreferenciaAgrupamentoFindAllResponse, ReqQuery<DiarioPreferenciaAgrupamentoFindAllData>>
  >;
  bulkReplacePreferenciasAgrupamento: (
    diarioId: string,
    data: ReqBody<DiarioPreferenciaAgrupamentoBulkReplaceData>
  ) => Promise<DiarioPreferenciaAgrupamentoBulkReplaceResponse>;
  uploadCover: UploadCoverFn;
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

  const batchCreate = (data: ReqBody<DiarioBatchCreateData>) =>
    api.call(diarioBatchCreate, { body: data });

  const update = (id: string, data: ReqBody<DiarioUpdateData>) =>
    api.call(diarioUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(diarioDeleteOneById, { path: { id } });

  const listProfessores = (
    diarioId: string,
    params?: MaybeRef<ReqQuery<DiarioProfessorFindAllData>>
  ) =>
    createListQuery({
      queryKey: [...keys, diarioId, 'professores'],
      fetcher: (query?: ReqQuery<DiarioProfessorFindAllData>) =>
        api.call(diarioProfessorFindAll, { path: { diarioId }, query }),
    })(params);

  const bulkReplaceProfessores = (
    diarioId: string,
    data: ReqBody<DiarioProfessorBulkReplaceData>
  ) => api.call(diarioProfessorBulkReplace, { path: { diarioId }, body: data });

  const listPreferenciasAgrupamento = (
    diarioId: string,
    params?: MaybeRef<ReqQuery<DiarioPreferenciaAgrupamentoFindAllData>>
  ) =>
    createListQuery({
      queryKey: [...keys, diarioId, 'preferencias-agrupamento'],
      fetcher: (query?: ReqQuery<DiarioPreferenciaAgrupamentoFindAllData>) =>
        api.call(diarioPreferenciaAgrupamentoFindAll, {
          path: { diarioId },
          query,
        }),
    })(params);

  const bulkReplacePreferenciasAgrupamento = (
    diarioId: string,
    data: ReqBody<DiarioPreferenciaAgrupamentoBulkReplaceData>
  ) =>
    api.call(diarioPreferenciaAgrupamentoBulkReplace, {
      path: { diarioId },
      body: data,
    });

  const uploadCover = (id: string, file: Blob) =>
    api.call(diarioUpdateImagemCapa, { path: { id }, body: { file } });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    batchCreate,
    update,
    remove,
    listProfessores,
    bulkReplaceProfessores,
    listPreferenciasAgrupamento,
    bulkReplacePreferenciasAgrupamento,
    uploadCover,
    invalidate,
  };
};
