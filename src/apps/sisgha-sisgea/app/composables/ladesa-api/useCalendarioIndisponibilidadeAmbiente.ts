import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import {
  createListQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type { ListFn, InvalidateFn } from '~/composables/query-helpers';
import { createCreateFn, createRemoveFn } from './-helpers/crudHelpers';
import {
  calendarioIndisponibilidadeAmbienteFindAll,
  calendarioIndisponibilidadeAmbientePorPeriodo,
  calendarioIndisponibilidadeAmbienteCreate,
  calendarioIndisponibilidadeAmbienteDeleteOneById,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioIndisponibilidadeAmbienteFindAllData,
  CalendarioIndisponibilidadeAmbienteFindAllResponse,
  CalendarioIndisponibilidadeAmbienteCreateData,
  CalendarioIndisponibilidadeAmbienteCreateResponse,
  CalendarioIndisponibilidadeAmbientePorPeriodoResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

type PorPeriodoParams = {
  ambienteId: string;
  dateStart: string;
  dateEnd: string;
};

export type IUseCalendarioIndisponibilidadeAmbiente = {
  keys: readonly string[];
  list: ListFn<
    CalendarioIndisponibilidadeAmbienteFindAllResponse,
    ReqQuery<CalendarioIndisponibilidadeAmbienteFindAllData>
  >;
  porPeriodo: (
    params: MaybeRef<PorPeriodoParams | null>
  ) => UseQueryReturnType<
    CalendarioIndisponibilidadeAmbientePorPeriodoResponse,
    Error
  >;
  create: (
    data: ReqBody<CalendarioIndisponibilidadeAmbienteCreateData>
  ) => Promise<CalendarioIndisponibilidadeAmbienteCreateResponse>;
  remove: (id: string) => Promise<unknown>;
  invalidate: InvalidateFn;
};

export const useCalendarioIndisponibilidadeAmbiente =
  (): IUseCalendarioIndisponibilidadeAmbiente => {
    const api = useApiClient();

    const keys = ['calendario-indisponibilidades-ambiente'] as const;

    const list = createListQuery({
      queryKey: keys,
      fetcher: (
        params?: ReqQuery<CalendarioIndisponibilidadeAmbienteFindAllData>
      ) => {
        return api.call(calendarioIndisponibilidadeAmbienteFindAll, {
          query: params,
        });
      },
    });

    const porPeriodo = (params: MaybeRef<PorPeriodoParams | null>) => {
      return useQuery({
        queryKey: computed(() => [
          ...keys,
          'por-periodo',
          JSON.stringify(unref(params)),
        ]),
        queryFn: () => {
          const value = unref(params);
          if (!value) throw new Error('missing por-periodo params');
          return api.call(calendarioIndisponibilidadeAmbientePorPeriodo, {
            query: value,
          });
        },
        enabled: computed(() => !!unref(params)),
      });
    };

    const create = createCreateFn<
      ReqBody<CalendarioIndisponibilidadeAmbienteCreateData>,
      CalendarioIndisponibilidadeAmbienteCreateResponse
    >(api, calendarioIndisponibilidadeAmbienteCreate);

    const remove = createRemoveFn(
      api,
      calendarioIndisponibilidadeAmbienteDeleteOneById
    );

    const invalidate = createInvalidate(keys);

    return { keys, list, porPeriodo, create, remove, invalidate };
  };
