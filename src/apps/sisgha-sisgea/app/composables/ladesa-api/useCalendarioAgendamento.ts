import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import {
  createFindOneQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  FindOneFn,
  CreateFn,
  UpdateFn,
  RemoveFn,
  InvalidateFn,
} from '~/composables/query-helpers';
import {
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
} from './-helpers/crudHelpers';
import {
  calendarioAgendamentoFindAll,
  calendarioAgendamentoFindById,
  calendarioAgendamentoCreate,
  calendarioAgendamentoUpdate,
  calendarioAgendamentoDeleteOneById,
  calendarioAgendamentoDesvincularTurma,
  calendarioAgendamentoUpdateStatus,
  consultaOcorrenciasPorData,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioAgendamentoFindByIdResponse,
  CalendarioAgendamentoFindAllData,
  CalendarioAgendamentoListOutputDto,
  CalendarioAgendamentoCreateData,
  CalendarioAgendamentoCreateResponse,
  CalendarioAgendamentoUpdateData,
  CalendarioAgendamentoUpdateResponse,
  CalendarioAgendamentoUpdateStatusInputDto,
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

type DesvincularTurmaFn = (agendamentoId: string, turmaId: string) => Promise<unknown>;

type UpdateStatusFn = (id: string, status: CalendarioAgendamentoUpdateStatusInputDto['status']) => Promise<unknown>;

export type IUseCalendarioAgendamento = {
  keys: readonly string[];
  consulta: ConsultaFn;
  findAll: FindAllFn;
  findOne: FindOneFn<CalendarioAgendamentoFindByIdResponse>;
  create: CreateFn<
    ReqBody<CalendarioAgendamentoCreateData>,
    CalendarioAgendamentoCreateResponse
  >;
  update: UpdateFn<
    ReqBody<CalendarioAgendamentoUpdateData>,
    CalendarioAgendamentoUpdateResponse
  >;
  remove: RemoveFn;
  desvincularTurma: DesvincularTurmaFn;
  updateStatus: UpdateStatusFn;
  invalidate: InvalidateFn;
};

export const useCalendarioAgendamento = (): IUseCalendarioAgendamento => {
  const api = useApiClient();

  const keys = ['calendario-agendamento'] as const;

  const consulta: ConsultaFn = (params) => {
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

  const create = createCreateFn<ReqBody<CalendarioAgendamentoCreateData>, CalendarioAgendamentoCreateResponse>(api, calendarioAgendamentoCreate);
  const update = createUpdateFn<ReqBody<CalendarioAgendamentoUpdateData>, CalendarioAgendamentoUpdateResponse>(api, calendarioAgendamentoUpdate);
  const remove = createRemoveFn(api, calendarioAgendamentoDeleteOneById);

  const desvincularTurma: DesvincularTurmaFn = (agendamentoId, turmaId) =>
    api.call(calendarioAgendamentoDesvincularTurma, { path: { id: agendamentoId, turmaId } });

  const updateStatusFn: UpdateStatusFn = (id, status) =>
    api.call(calendarioAgendamentoUpdateStatus, { path: { id }, body: { status } });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    consulta,
    findAll,
    findOne,
    create,
    update,
    remove,
    desvincularTurma,
    updateStatus: updateStatusFn,
    invalidate,
  };
};
