import { createListQuery } from '~/composables/query-helpers';
import type { ListFn } from '~/composables/query-helpers';
import {
  diarioPreferenciaAgrupamentoFindAll,
  diarioPreferenciaAgrupamentoBulkReplace,
} from '@ladesa-ro/web.api.client';
import type {
  DiarioPreferenciaAgrupamentoFindAllData,
  DiarioPreferenciaAgrupamentoFindAllResponse,
  DiarioPreferenciaAgrupamentoBulkReplaceData,
  DiarioPreferenciaAgrupamentoBulkReplaceResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseDiariosPreferencias = {
  listPreferenciasAgrupamento: (
    diarioId: string,
    params?: MaybeRef<ReqQuery<DiarioPreferenciaAgrupamentoFindAllData>>
  ) => ReturnType<
    ListFn<
      DiarioPreferenciaAgrupamentoFindAllResponse,
      ReqQuery<DiarioPreferenciaAgrupamentoFindAllData>
    >
  >;
  bulkReplacePreferenciasAgrupamento: (
    diarioId: string,
    data: ReqBody<DiarioPreferenciaAgrupamentoBulkReplaceData>
  ) => Promise<DiarioPreferenciaAgrupamentoBulkReplaceResponse>;
};

export function useDiariosPreferencias(
  keys: readonly string[]
): IUseDiariosPreferencias {
  const api = useApiClient();

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

  return {
    listPreferenciasAgrupamento,
    bulkReplacePreferenciasAgrupamento,
  };
}
