import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import {
  createListQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type { ListFn, InvalidateFn } from '~/composables/query-helpers';
import { createCreateFn, createRemoveFn } from './-helpers/crudHelpers';
import {
  calendarioIndisponibilidadeProfessorFindAll,
  calendarioIndisponibilidadeProfessorPorPeriodo,
  calendarioIndisponibilidadeProfessorCreate,
  calendarioIndisponibilidadeProfessorDeleteOneById,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioIndisponibilidadeProfessorFindAllData,
  CalendarioIndisponibilidadeProfessorFindAllResponse,
  CalendarioIndisponibilidadeProfessorCreateData,
  CalendarioIndisponibilidadeProfessorCreateResponse,
  CalendarioIndisponibilidadeProfessorPorPeriodoResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

type PorPeriodoParams = {
  perfilId: string;
  dateStart: string;
  dateEnd: string;
};

export type IUseCalendarioIndisponibilidadeProfessor = {
  keys: readonly string[];
  list: ListFn<
    CalendarioIndisponibilidadeProfessorFindAllResponse,
    ReqQuery<CalendarioIndisponibilidadeProfessorFindAllData>
  >;
  porPeriodo: (
    params: MaybeRef<PorPeriodoParams | null>
  ) => UseQueryReturnType<
    CalendarioIndisponibilidadeProfessorPorPeriodoResponse,
    Error
  >;
  create: (
    data: ReqBody<CalendarioIndisponibilidadeProfessorCreateData>
  ) => Promise<CalendarioIndisponibilidadeProfessorCreateResponse>;
  remove: (id: string) => Promise<unknown>;
  invalidate: InvalidateFn;
};

export const useCalendarioIndisponibilidadeProfessor =
  (): IUseCalendarioIndisponibilidadeProfessor => {
    const api = useApiClient();

    const keys = ['calendario-indisponibilidades-professor'] as const;

    const list = createListQuery({
      queryKey: keys,
      fetcher: (
        params?: ReqQuery<CalendarioIndisponibilidadeProfessorFindAllData>
      ) => {
        return api.call(calendarioIndisponibilidadeProfessorFindAll, {
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
          return api.call(calendarioIndisponibilidadeProfessorPorPeriodo, {
            query: value,
          });
        },
        enabled: computed(() => !!unref(params)),
      });
    };

    const create = createCreateFn<
      ReqBody<CalendarioIndisponibilidadeProfessorCreateData>,
      CalendarioIndisponibilidadeProfessorCreateResponse
    >(api, calendarioIndisponibilidadeProfessorCreate);

    const remove = createRemoveFn(
      api,
      calendarioIndisponibilidadeProfessorDeleteOneById
    );

    const invalidate = createInvalidate(keys);

    return { keys, list, porPeriodo, create, remove, invalidate };
  };
