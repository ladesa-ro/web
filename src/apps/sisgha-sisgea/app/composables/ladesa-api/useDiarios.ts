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
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
  createUploadImageFn,
} from './-helpers/crudHelpers';
import {
  diarioFindAll,
  diarioFindById,
  diarioCreate,
  diarioBatchCreate,
  diarioUpdate,
  diarioDeleteOneById,
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
import { useDiariosProfessores } from './useDiariosProfessores';
import { useDiariosPreferencias } from './useDiariosPreferencias';

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

  const create = createCreateFn<ReqBody<DiarioCreateData>, DiarioCreateResponse>(api, diarioCreate);
  const batchCreate = createCreateFn<ReqBody<DiarioBatchCreateData>, DiarioBatchCreateResponse>(api, diarioBatchCreate);
  const update = createUpdateFn<ReqBody<DiarioUpdateData>, DiarioUpdateResponse>(api, diarioUpdate);
  const remove = createRemoveFn(api, diarioDeleteOneById);

  const professores = useDiariosProfessores(keys);
  const preferencias = useDiariosPreferencias(keys);

  const uploadCover = createUploadImageFn(api, diarioUpdateImagemCapa);

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
    ...professores,
    ...preferencias,
    uploadCover,
    invalidate,
  };
};
