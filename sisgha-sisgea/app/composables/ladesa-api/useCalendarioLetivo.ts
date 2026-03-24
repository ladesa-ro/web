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
import type {
  CalendarioLetivoFindAllData,
  CalendarioLetivoFindAllResponse,
  CalendarioLetivoFindByIdResponse,
  CalendarioLetivoCreateData,
  CalendarioLetivoCreateResponse,
  CalendarioLetivoUpdateData,
  CalendarioLetivoUpdateResponse,
} from '~/helpers/api-client';

export type IUseCalendarioLetivo = {
  keys: readonly string[];
  list: ListFn<CalendarioLetivoFindAllResponse, CalendarioLetivoFindAllData>;
  listInfinite: ListInfiniteFn<
    CalendarioLetivoFindAllResponse,
    CalendarioLetivoFindAllData
  >;
  findOne: FindOneFn<CalendarioLetivoFindByIdResponse>;
  create: CreateFn<
    CalendarioLetivoCreateData['requestBody'],
    CalendarioLetivoCreateResponse
  >;
  update: UpdateFn<
    CalendarioLetivoUpdateData['requestBody'],
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
    fetcher: (params?: CalendarioLetivoFindAllData) =>
      api.calendariosLetivos.calendarioLetivoFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: CalendarioLetivoFindAllData & { page: number }) =>
      api.calendariosLetivos.calendarioLetivoFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) =>
      api.calendariosLetivos.calendarioLetivoFindById({ id }),
  });

  const create = (data: CalendarioLetivoCreateData['requestBody']) =>
    api.calendariosLetivos.calendarioLetivoCreate({ requestBody: data });

  const update = (
    id: string,
    data: CalendarioLetivoUpdateData['requestBody']
  ) => api.calendariosLetivos.calendarioLetivoUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.calendariosLetivos.calendarioLetivoDeleteOneById({ id });

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
