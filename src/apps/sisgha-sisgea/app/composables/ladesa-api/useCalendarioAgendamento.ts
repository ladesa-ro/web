import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import {
  createFindOneQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  FindOneFn,
  CreateFn,
  RemoveFn,
  InvalidateFn,
} from '~/composables/query-helpers';
import { createCreateFn, createRemoveFn } from './-helpers/crudHelpers';
import { buildIfMatchHeaders } from './-helpers/ifMatch';
import {
  calendarioAgendamentoFindAll,
  calendarioAgendamentoFindById,
  calendarioAgendamentoCreate,
  calendarioAgendamentoUpdate,
  calendarioAgendamentoDeleteOneById,
  calendarioAgendamentoDesvincularTurma,
  calendarioAgendamentoUpdateStatus,
  calendarioAgendamentoEditarOcorrencia,
  calendarioAgendamentoCancelarOcorrencia,
  calendarioAgendamentoEditarSerie,
  calendarioAgendamentoAdicionarDataAvulsa,
  calendarioAgendamentoLinhaDoTempo,
  calendarioAgendamentoImportarIcs,
  consultaOcorrenciasPorData,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioAgendamentoFindByIdResponse,
  CalendarioAgendamentoFindAllData,
  CalendarioAgendamentoListOutputDto,
  CalendarioAgendamentoCreateData,
  CalendarioAgendamentoCreateResponse,
  CalendarioAgendamentoUpdateInputDto,
  CalendarioAgendamentoUpdateResponse,
  CalendarioAgendamentoUpdateStatusInputDto,
  CalendarioAgendamentoEditarOcorrenciaInputDto,
  CalendarioAgendamentoEditarOcorrenciaResponse,
  CalendarioAgendamentoCancelarOcorrenciaInputDto,
  CalendarioAgendamentoCancelarOcorrenciaResponse,
  CalendarioAgendamentoEditarSerieInputDto,
  CalendarioAgendamentoEditarSerieResponse,
  CalendarioAgendamentoAdicionarDataAvulsaInputDto,
  CalendarioAgendamentoAdicionarDataAvulsaResponse,
  CalendarioAgendamentoLinhaDoTempoResponse,
  CalendarioAgendamentoImportarIcsInputDto,
  CalendarioAgendamentoImportarIcsResponse,
  ConsultaOcorrenciasPorDataResponse,
  ReqBody,
} from '@ladesa-ro/web.api.client';

type ConsultaParams = {
  dateStart: string;
  dateEnd: string;
  campus?: string;
  turma?: string;
  professor?: string;
  tipo?: string;
};

type FindAllQuery = CalendarioAgendamentoFindAllData['query'];

type ConsultaFn = (
  params: MaybeRef<ConsultaParams>
) => UseQueryReturnType<ConsultaOcorrenciasPorDataResponse, Error>;

type FindAllFn = (
  params?: MaybeRef<FindAllQuery | undefined>
) => UseQueryReturnType<CalendarioAgendamentoListOutputDto, Error>;

type DesvincularTurmaFn = (
  agendamentoId: string,
  turmaId: string
) => Promise<unknown>;

type UpdateStatusFn = (
  id: string,
  status: CalendarioAgendamentoUpdateStatusInputDto['status']
) => Promise<unknown>;

type UpdateWithIfMatchFn<TBody, TResult> = (
  id: string,
  data: TBody,
  version: number
) => Promise<TResult>;

export type IUseCalendarioAgendamento = {
  keys: readonly string[];
  consulta: ConsultaFn;
  findAll: FindAllFn;
  findOne: FindOneFn<CalendarioAgendamentoFindByIdResponse>;
  linhaDoTempo: FindOneFn<CalendarioAgendamentoLinhaDoTempoResponse>;
  create: CreateFn<
    ReqBody<CalendarioAgendamentoCreateData>,
    CalendarioAgendamentoCreateResponse
  >;
  update: UpdateWithIfMatchFn<
    CalendarioAgendamentoUpdateInputDto,
    CalendarioAgendamentoUpdateResponse
  >;
  editarOcorrencia: UpdateWithIfMatchFn<
    CalendarioAgendamentoEditarOcorrenciaInputDto,
    CalendarioAgendamentoEditarOcorrenciaResponse
  >;
  cancelarOcorrencia: UpdateWithIfMatchFn<
    CalendarioAgendamentoCancelarOcorrenciaInputDto,
    CalendarioAgendamentoCancelarOcorrenciaResponse
  >;
  editarSerie: UpdateWithIfMatchFn<
    CalendarioAgendamentoEditarSerieInputDto,
    CalendarioAgendamentoEditarSerieResponse
  >;
  adicionarDataAvulsa: UpdateWithIfMatchFn<
    CalendarioAgendamentoAdicionarDataAvulsaInputDto,
    CalendarioAgendamentoAdicionarDataAvulsaResponse
  >;
  remove: RemoveFn;
  desvincularTurma: DesvincularTurmaFn;
  updateStatus: UpdateStatusFn;
  importarIcs: (
    data: CalendarioAgendamentoImportarIcsInputDto
  ) => Promise<CalendarioAgendamentoImportarIcsResponse>;
  invalidate: InvalidateFn;
};

export const useCalendarioAgendamento = (): IUseCalendarioAgendamento => {
  const api = useApiClient();

  const keys = ['calendario-agendamento'] as const;

  const consulta: ConsultaFn = params => {
    const queryKey = computed(() => [
      ...keys,
      'consulta',
      JSON.stringify(unref(params)),
    ]);

    return useQuery({
      queryKey,
      queryFn: () =>
        api.call(consultaOcorrenciasPorData, { query: unref(params) }),
    });
  };

  const findAll: FindAllFn = (params?) => {
    const queryKey = computed(() => [
      ...keys,
      'list',
      JSON.stringify(unref(params)),
    ]);

    return useQuery({
      queryKey,
      queryFn: () =>
        api.call(calendarioAgendamentoFindAll, { query: unref(params) }),
      enabled: computed(() => unref(params) !== undefined),
    });
  };

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) =>
      api.call(calendarioAgendamentoFindById, { path: { id } }),
  });

  const linhaDoTempo = createFindOneQuery({
    queryKey: [...keys, 'linha-do-tempo'],
    fetcher: (identificadorExterno: string) =>
      api.call(calendarioAgendamentoLinhaDoTempo, {
        path: { identificadorExterno },
      }),
  });

  const create = createCreateFn<
    ReqBody<CalendarioAgendamentoCreateData>,
    CalendarioAgendamentoCreateResponse
  >(api, calendarioAgendamentoCreate);

  const update: IUseCalendarioAgendamento['update'] = (id, data, version) =>
    api.call(calendarioAgendamentoUpdate, {
      path: { id },
      body: data,
      headers: buildIfMatchHeaders(version),
    });

  const editarOcorrencia: IUseCalendarioAgendamento['editarOcorrencia'] = (
    id,
    data,
    version
  ) =>
    api.call(calendarioAgendamentoEditarOcorrencia, {
      path: { id },
      body: data,
      headers: buildIfMatchHeaders(version),
    });

  const cancelarOcorrencia: IUseCalendarioAgendamento['cancelarOcorrencia'] = (
    id,
    data,
    version
  ) =>
    api.call(calendarioAgendamentoCancelarOcorrencia, {
      path: { id },
      body: data,
      headers: buildIfMatchHeaders(version),
    });

  const editarSerie: IUseCalendarioAgendamento['editarSerie'] = (
    id,
    data,
    version
  ) =>
    api.call(calendarioAgendamentoEditarSerie, {
      path: { id },
      body: data,
      headers: buildIfMatchHeaders(version),
    });

  const adicionarDataAvulsa: IUseCalendarioAgendamento['adicionarDataAvulsa'] =
    (id, data, version) =>
      api.call(calendarioAgendamentoAdicionarDataAvulsa, {
        path: { id },
        body: data,
        headers: buildIfMatchHeaders(version),
      });

  const remove = createRemoveFn(api, calendarioAgendamentoDeleteOneById);

  const desvincularTurma: DesvincularTurmaFn = (agendamentoId, turmaId) =>
    api.call(calendarioAgendamentoDesvincularTurma, {
      path: { id: agendamentoId, turmaId },
    });

  const updateStatusFn: UpdateStatusFn = (id, status) =>
    api.call(calendarioAgendamentoUpdateStatus, {
      path: { id },
      body: { status },
    });

  const importarIcs: IUseCalendarioAgendamento['importarIcs'] = data =>
    api.call(calendarioAgendamentoImportarIcs, { body: data });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    consulta,
    findAll,
    findOne,
    linhaDoTempo,
    create,
    update,
    editarOcorrencia,
    cancelarOcorrencia,
    editarSerie,
    adicionarDataAvulsa,
    remove,
    desvincularTurma,
    updateStatus: updateStatusFn,
    importarIcs,
    invalidate,
  };
};
