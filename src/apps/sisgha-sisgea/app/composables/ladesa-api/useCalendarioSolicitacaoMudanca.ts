import {
  createListQuery,
  createFindOneQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  ListFn,
  FindOneFn,
  InvalidateFn,
} from '~/composables/query-helpers';
import { createCreateFn } from './-helpers/crudHelpers';
import {
  calendarioSolicitacaoMudancaFindAll,
  calendarioSolicitacaoMudancaFindOneById,
  calendarioSolicitacaoMudancaCreate,
  calendarioSolicitacaoMudancaAprovar,
  calendarioSolicitacaoMudancaRecusar,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioSolicitacaoMudancaFindAllData,
  CalendarioSolicitacaoMudancaFindAllResponse,
  CalendarioSolicitacaoMudancaFindOneByIdResponse,
  CalendarioSolicitacaoMudancaCreateData,
  CalendarioSolicitacaoMudancaCreateResponse,
  CalendarioSolicitacaoMudancaAprovarResponse,
  CalendarioSolicitacaoMudancaRecusarInputDto,
  CalendarioSolicitacaoMudancaRecusarResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseCalendarioSolicitacaoMudanca = {
  keys: readonly string[];
  list: ListFn<
    CalendarioSolicitacaoMudancaFindAllResponse,
    ReqQuery<CalendarioSolicitacaoMudancaFindAllData>
  >;
  findOne: FindOneFn<CalendarioSolicitacaoMudancaFindOneByIdResponse>;
  create: (
    data: ReqBody<CalendarioSolicitacaoMudancaCreateData>
  ) => Promise<CalendarioSolicitacaoMudancaCreateResponse>;
  aprovar: (id: string) => Promise<CalendarioSolicitacaoMudancaAprovarResponse>;
  recusar: (
    id: string,
    data: CalendarioSolicitacaoMudancaRecusarInputDto
  ) => Promise<CalendarioSolicitacaoMudancaRecusarResponse>;
  invalidate: InvalidateFn;
};

export const useCalendarioSolicitacaoMudanca =
  (): IUseCalendarioSolicitacaoMudanca => {
    const api = useApiClient();

    const keys = ['calendario-solicitacoes-mudanca'] as const;

    const list = createListQuery({
      queryKey: keys,
      fetcher: (params?: ReqQuery<CalendarioSolicitacaoMudancaFindAllData>) => {
        return api.call(calendarioSolicitacaoMudancaFindAll, {
          query: params,
        });
      },
    });

    const findOne = createFindOneQuery({
      queryKey: keys,
      fetcher: (id: string) => {
        return api.call(calendarioSolicitacaoMudancaFindOneById, {
          path: { id },
        });
      },
    });

    const create = createCreateFn<
      ReqBody<CalendarioSolicitacaoMudancaCreateData>,
      CalendarioSolicitacaoMudancaCreateResponse
    >(api, calendarioSolicitacaoMudancaCreate);

    const aprovar = (id: string) => {
      return api.call(calendarioSolicitacaoMudancaAprovar, { path: { id } });
    };

    const recusar = (
      id: string,
      data: CalendarioSolicitacaoMudancaRecusarInputDto
    ) => {
      return api.call(calendarioSolicitacaoMudancaRecusar, {
        path: { id },
        body: data,
      });
    };

    const invalidate = createInvalidate(keys);

    return { keys, list, findOne, create, aprovar, recusar, invalidate };
  };
