import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
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
} from '~/composables/query-helpers';
import { createCreateFn, createUpdateFn } from './-helpers/crudHelpers';
import {
  calendarioColecaoFindAll,
  calendarioColecaoCreate,
  calendarioColecaoFindOneById,
  calendarioColecaoUpdate,
  calendarioColecaoDeleteOneById,
  calendarioColecaoTransferirDono,
  calendarioColecaoAcessoFindAll,
  calendarioColecaoAcessoConceder,
  calendarioColecaoAcessoRevogarOneById,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioColecaoFindAllData,
  CalendarioColecaoFindAllResponse,
  CalendarioColecaoFindOneByIdResponse,
  CalendarioColecaoCreateData,
  CalendarioColecaoCreateResponse,
  CalendarioColecaoUpdateData,
  CalendarioColecaoUpdateResponse,
  CalendarioColecaoTransferirDonoInputDto,
  CalendarioColecaoTransferirDonoResponse,
  CalendarioColecaoAcessoFindAllData,
  CalendarioColecaoAcessoListOutputDto,
  CalendarioColecaoAcessoConcederInputDto,
  CalendarioColecaoAcessoConcederResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

type AcessosListFn = (
  colecaoId: MaybeRef<string | null>,
  params?: MaybeRef<ReqQuery<CalendarioColecaoAcessoFindAllData> | undefined>
) => UseQueryReturnType<CalendarioColecaoAcessoListOutputDto | null, Error>;

type AcessoConcederFn = (
  colecaoId: string,
  data: CalendarioColecaoAcessoConcederInputDto
) => Promise<CalendarioColecaoAcessoConcederResponse>;

type AcessoRevogarFn = (
  colecaoId: string,
  acessoId: string
) => Promise<unknown>;

type TransferirDonoFn = (
  id: string,
  data: CalendarioColecaoTransferirDonoInputDto
) => Promise<CalendarioColecaoTransferirDonoResponse>;

export type IUseCalendarioColecao = {
  keys: readonly string[];
  list: ListFn<
    CalendarioColecaoFindAllResponse,
    ReqQuery<CalendarioColecaoFindAllData>
  >;
  listInfinite: ListInfiniteFn<
    CalendarioColecaoFindAllResponse,
    ReqQuery<CalendarioColecaoFindAllData>
  >;
  findOne: FindOneFn<CalendarioColecaoFindOneByIdResponse>;
  create: CreateFn<
    ReqBody<CalendarioColecaoCreateData>,
    CalendarioColecaoCreateResponse
  >;
  update: UpdateFn<
    ReqBody<CalendarioColecaoUpdateData>,
    CalendarioColecaoUpdateResponse
  >;
  remove: RemoveFn;
  transferirDono: TransferirDonoFn;
  acessos: {
    list: AcessosListFn;
    conceder: AcessoConcederFn;
    revogar: AcessoRevogarFn;
  };
  invalidate: InvalidateFn;
};

export const useCalendarioColecao = (): IUseCalendarioColecao => {
  const api = useApiClient();

  const keys = ['calendario-colecoes'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<CalendarioColecaoFindAllData>) =>
      api.call(calendarioColecaoFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<CalendarioColecaoFindAllData>) =>
      api.call(calendarioColecaoFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) =>
      api.call(calendarioColecaoFindOneById, { path: { id } }),
  });

  const create = createCreateFn<
    ReqBody<CalendarioColecaoCreateData>,
    CalendarioColecaoCreateResponse
  >(api, calendarioColecaoCreate);

  const update = createUpdateFn<
    ReqBody<CalendarioColecaoUpdateData>,
    CalendarioColecaoUpdateResponse
  >(api, calendarioColecaoUpdate);

  const remove: RemoveFn = (id: string) =>
    api.call(calendarioColecaoDeleteOneById, { path: { id } });

  const transferirDono: TransferirDonoFn = (id, data) =>
    api.call(calendarioColecaoTransferirDono, { path: { id }, body: data });

  const acessosList: AcessosListFn = (colecaoId, params?) => {
    const queryKey = computed(() => [
      ...keys,
      unref(colecaoId),
      'acessos',
      JSON.stringify(unref(params)),
    ]);

    return useQuery({
      queryKey,
      queryFn: () =>
        api.call(calendarioColecaoAcessoFindAll, {
          path: { colecaoId: unref(colecaoId) as string },
          query: unref(params),
        }),
      enabled: computed(() => !!unref(colecaoId)),
    });
  };

  const acessoConceder: AcessoConcederFn = (colecaoId, data) =>
    api.call(calendarioColecaoAcessoConceder, {
      path: { colecaoId },
      body: data,
    });

  const acessoRevogar: AcessoRevogarFn = (colecaoId, acessoId) =>
    api.call(calendarioColecaoAcessoRevogarOneById, {
      path: { colecaoId, id: acessoId },
    });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    update,
    remove,
    transferirDono,
    acessos: {
      list: acessosList,
      conceder: acessoConceder,
      revogar: acessoRevogar,
    },
    invalidate,
  };
};
