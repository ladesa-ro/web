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
  list: ListFn<CalendarioLetivoFindAllResponse, ReqQuery<CalendarioLetivoFindAllData>>;
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

  const create = (data: ReqBody<CalendarioLetivoCreateData>) =>
    api.call(calendarioLetivoCreate, { body: data });

  const update = (
    id: string,
    data: ReqBody<CalendarioLetivoUpdateData>
  ) => api.call(calendarioLetivoUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(calendarioLetivoDeleteOneById, { path: { id } });

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
