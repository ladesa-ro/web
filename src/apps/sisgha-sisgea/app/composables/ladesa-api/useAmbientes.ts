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
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
  createUploadImageFn,
} from './-helpers/crudHelpers';
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

  const create = createCreateFn<
    ReqBody<AmbienteCreateData>,
    AmbienteCreateResponse
  >(api, ambienteCreate);
  const update = createUpdateFn<
    ReqBody<AmbienteUpdateData>,
    AmbienteUpdateResponse
  >(api, ambienteUpdate);
  const remove = createRemoveFn(api, ambienteDeleteOneById);
  const uploadCover = createUploadImageFn(api, ambienteUpdateImagemCapa);

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
