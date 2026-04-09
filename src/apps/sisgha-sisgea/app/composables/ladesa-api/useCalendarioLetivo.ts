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
import {
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
} from './-helpers/crudHelpers';
import {
  calendarioLetivoFindAll,
  calendarioLetivoFindById,
  calendarioLetivoCreate,
  calendarioLetivoUpdate,
  calendarioLetivoDeleteOneById,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioLetivoFindAllData,
  CalendarioLetivoFindAllResponse,
  CalendarioLetivoFindByIdResponse,
  CalendarioLetivoCreateData,
  CalendarioLetivoCreateResponse,
  CalendarioLetivoUpdateData,
  CalendarioLetivoUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseCalendarioLetivo = {
  keys: readonly string[];
  list: ListFn<
    CalendarioLetivoFindAllResponse,
    ReqQuery<CalendarioLetivoFindAllData>
  >;
  listInfinite: ListInfiniteFn<
    CalendarioLetivoFindAllResponse,
    ReqQuery<CalendarioLetivoFindAllData>
  >;
  findOne: FindOneFn<CalendarioLetivoFindByIdResponse>;
  create: CreateFn<
    ReqBody<CalendarioLetivoCreateData>,
    CalendarioLetivoCreateResponse
  >;
  update: UpdateFn<
    ReqBody<CalendarioLetivoUpdateData>,
    CalendarioLetivoUpdateResponse
  >;
  remove: RemoveFn;
  invalidate: InvalidateFn;
};

export const useCalendarioLetivo = (): IUseCalendarioLetivo => {
  const api = useApiClient();

  const keys = ['calendario-letivo'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<CalendarioLetivoFindAllData>) =>
      api.call(calendarioLetivoFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<CalendarioLetivoFindAllData>) =>
      api.call(calendarioLetivoFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) =>
      api.call(calendarioLetivoFindById, { path: { id } }),
  });

  const create = createCreateFn<ReqBody<CalendarioLetivoCreateData>, CalendarioLetivoCreateResponse>(api, calendarioLetivoCreate);
  const update = createUpdateFn<ReqBody<CalendarioLetivoUpdateData>, CalendarioLetivoUpdateResponse>(api, calendarioLetivoUpdate);
  const remove = createRemoveFn(api, calendarioLetivoDeleteOneById);

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    update,
    remove,
    invalidate,
  };
};
