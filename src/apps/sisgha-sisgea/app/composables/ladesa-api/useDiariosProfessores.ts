import {
  createListQuery,
} from '~/composables/query-helpers';
import type {
  ListFn,
} from '~/composables/query-helpers';
import {
  diarioProfessorFindAll,
  diarioProfessorBulkReplace,
} from '@ladesa-ro/web.api.client';
import type {
  DiarioProfessorFindAllData,
  DiarioProfessorFindAllResponse,
  DiarioProfessorBulkReplaceData,
  DiarioProfessorBulkReplaceResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseDiariosProfessores = {
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
};

export function useDiariosProfessores(keys: readonly string[]): IUseDiariosProfessores {
  const api = useApiClient();

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

  return {
    listProfessores,
    bulkReplaceProfessores,
  };
}
