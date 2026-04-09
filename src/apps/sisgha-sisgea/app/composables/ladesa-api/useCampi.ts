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
  campusFindAll,
  campusFindById,
  campusCreate,
  campusUpdate,
  campusDeleteOneById,
} from '@ladesa-ro/web.api.client';
import type {
  CampusFindAllData,
  CampusFindAllResponse,
  CampusFindByIdResponse,
  CampusCreateData,
  CampusCreateResponse,
  CampusUpdateData,
  CampusUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseCampi = {
  keys: readonly string[];
  list: ListFn<CampusFindAllResponse, ReqQuery<CampusFindAllData>>;
  listInfinite: ListInfiniteFn<
    CampusFindAllResponse,
    ReqQuery<CampusFindAllData>
  >;
  findOne: FindOneFn<CampusFindByIdResponse>;
  create: CreateFn<ReqBody<CampusCreateData>, CampusCreateResponse>;
  update: UpdateFn<ReqBody<CampusUpdateData>, CampusUpdateResponse>;
  remove: RemoveFn;
  invalidate: InvalidateFn;
};

export const useCampi = (): IUseCampi => {
  const api = useApiClient();

  const keys = ['campi'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<CampusFindAllData>) =>
      api.call(campusFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<CampusFindAllData>) =>
      api.call(campusFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(campusFindById, { path: { id } }),
  });

  const create = createCreateFn<
    ReqBody<CampusCreateData>,
    CampusCreateResponse
  >(api, campusCreate);
  const update = createUpdateFn<
    ReqBody<CampusUpdateData>,
    CampusUpdateResponse
  >(api, campusUpdate);
  const remove = createRemoveFn(api, campusDeleteOneById);

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
