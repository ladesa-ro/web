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
  UploadCoverFn,
} from '~/composables/query-helpers';
import {
  ambienteFindAll,
  ambienteFindById,
  ambienteCreate,
  ambienteUpdate,
  ambienteDeleteOneById,
  ambienteUpdateImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  AmbienteFindAllData,
  AmbienteFindAllResponse,
  AmbienteFindByIdResponse,
  AmbienteCreateData,
  AmbienteCreateResponse,
  AmbienteUpdateData,
  AmbienteUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseAmbientes = {
  keys: readonly string[];
  list: ListFn<AmbienteFindAllResponse, ReqQuery<AmbienteFindAllData>>;
  listInfinite: ListInfiniteFn<
    AmbienteFindAllResponse,
    ReqQuery<AmbienteFindAllData>
  >;
  findOne: FindOneFn<AmbienteFindByIdResponse>;
  create: CreateFn<ReqBody<AmbienteCreateData>, AmbienteCreateResponse>;
  update: UpdateFn<ReqBody<AmbienteUpdateData>, AmbienteUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  invalidate: InvalidateFn;
};

export const useAmbientes = (): IUseAmbientes => {
  const api = useApiClient();

  const keys = ['ambientes'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<AmbienteFindAllData>) => {
      return api.call(ambienteFindAll, { query: params });
    },
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<AmbienteFindAllData>) => {
      return api.call(ambienteFindAll, { query: params });
    },
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => {
      return api.call(ambienteFindById, { path: { id } });
    },
  });

  const create = (data: ReqBody<AmbienteCreateData>) => {
    return api.call(ambienteCreate, { body: data });
  };

  const update = (id: string, data: ReqBody<AmbienteUpdateData>) => {
    return api.call(ambienteUpdate, { path: { id }, body: data });
  };

  const remove = (id: string) => {
    return api.call(ambienteDeleteOneById, { path: { id } });
  };

  const uploadCover = (id: string, file: Blob) => {
    return api.call(ambienteUpdateImagemCapa, { path: { id }, body: { file } });
  };

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    update,
    remove,
    uploadCover,
    invalidate,
  };
};
