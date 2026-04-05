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
  calendarioAgendamentoFindById,
  calendarioAgendamentoCreate,
  calendarioAgendamentoUpdate,
  calendarioAgendamentoDeleteOneById,
  consultaOcorrenciasPorData,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioAgendamentoFindByIdResponse,
  CalendarioAgendamentoCreateData,
  CalendarioAgendamentoCreateResponse,
  CalendarioAgendamentoUpdateData,
  CalendarioAgendamentoUpdateResponse,
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

type ConsultaFn = (
  params: MaybeRef<ConsultaParams>
) => UseQueryReturnType<ConsultaOcorrenciasPorDataResponse, Error>;

export type IUseCalendarioAgendamento = {
  keys: readonly string[];
  consulta: ConsultaFn;
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

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) =>
      api.call(calendarioAgendamentoFindById, { path: { id } }),
  });

  const create = (data: ReqBody<CalendarioAgendamentoCreateData>) =>
    api.call(calendarioAgendamentoCreate, { body: data });

  const update = (id: string, data: ReqBody<CalendarioAgendamentoUpdateData>) =>
    api.call(calendarioAgendamentoUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(calendarioAgendamentoDeleteOneById, { path: { id } });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    consulta,
    findOne,
    create,
    update,
    remove,
    invalidate,
  };
};
