import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import {
  calendarioOcupacaoSemDetalhe,
  calendarioAgendamentoExportarIcs,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioOcupacaoSemDetalheData,
  CalendarioOcupacaoSemDetalheResponse,
  CalendarioAgendamentoExportarIcsData,
} from '@ladesa-ro/web.api.client';

type OcupacaoQuery = NonNullable<CalendarioOcupacaoSemDetalheData['query']>;
export type ExportarIcsQuery = NonNullable<
  CalendarioAgendamentoExportarIcsData['query']
>;

type OcupacaoFn = (
  params: MaybeRef<OcupacaoQuery | undefined>
) => UseQueryReturnType<CalendarioOcupacaoSemDetalheResponse, Error>;

export type IUseCalendarioConsultas = {
  ocupacao: OcupacaoFn;
  exportarIcsUrl: (query: ExportarIcsQuery) => string;
  exportarIcsBaixar: (query: ExportarIcsQuery) => Promise<string>;
};

function buildQueryString(query: Record<string, unknown>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue;
    params.append(key, String(value));
  }
  return params.toString();
}

export const useCalendarioConsultas = (): IUseCalendarioConsultas => {
  const api = useApiClient();

  const ocupacao: OcupacaoFn = params => {
    const queryKey = computed(() => [
      'calendario-ocupacao',
      JSON.stringify(unref(params)),
    ]);

    return useQuery({
      queryKey,
      queryFn: () =>
        api.call(calendarioOcupacaoSemDetalhe, {
          query: unref(params) as OcupacaoQuery,
        }),
      enabled: computed(() => unref(params) !== undefined),
    });
  };

  const exportarIcsUrl = (query: ExportarIcsQuery): string => {
    const qs = buildQueryString(query);
    return `${api.baseUrl.replace(/\/$/, '')}/calendario/consultas/ocorrencias/ics?${qs}`;
  };

  const exportarIcsBaixar = (query: ExportarIcsQuery): Promise<string> =>
    api.call(calendarioAgendamentoExportarIcs, { query }) as Promise<string>;

  return {
    ocupacao,
    exportarIcsUrl,
    exportarIcsBaixar,
  };
};
