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
  CampusFindAllData,
  CampusFindAllResponse,
  CampusFindByIdResponse,
  CampusCreateData,
  CampusCreateResponse,
  CampusUpdateData,
  CampusUpdateResponse,
} from '@ladesa-ro/web.api.client';

export type IUseCampi = {
  keys: readonly string[];
  list: ListFn<CampusFindAllResponse, CampusFindAllData>;
  listInfinite: ListInfiniteFn<CampusFindAllResponse, CampusFindAllData>;
  findOne: FindOneFn<CampusFindByIdResponse>;
  create: CreateFn<CampusCreateData['requestBody'], CampusCreateResponse>;
  update: UpdateFn<CampusUpdateData['requestBody'], CampusUpdateResponse>;
  remove: RemoveFn;
  invalidate: InvalidateFn;
};

export const useCampi = (): IUseCampi => {
  const api = useApiClient();

  const keys = ['campi'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: CampusFindAllData) => api.campi.campusFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: CampusFindAllData & { page: number }) =>
      api.campi.campusFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.campi.campusFindById({ id }),
  });

  const create = (data: CampusCreateData['requestBody']) =>
    api.campi.campusCreate({ requestBody: data });

  const update = (id: string, data: CampusUpdateData['requestBody']) =>
    api.campi.campusUpdate({ id, requestBody: data });

  const remove = (id: string) => api.campi.campusDeleteOneById({ id });

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
