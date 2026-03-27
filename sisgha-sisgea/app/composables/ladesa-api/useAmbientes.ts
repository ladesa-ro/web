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
import type {
  AmbienteFindAllData,
  AmbienteFindAllResponse,
  AmbienteFindByIdResponse,
  AmbienteCreateData,
  AmbienteCreateResponse,
  AmbienteUpdateData,
  AmbienteUpdateResponse,
} from '@ladesa-ro/web.api.client';

export type IUseAmbientes = {
  keys: readonly string[];
  list: ListFn<AmbienteFindAllResponse, AmbienteFindAllData>;
  listInfinite: ListInfiniteFn<AmbienteFindAllResponse, AmbienteFindAllData>;
  findOne: FindOneFn<AmbienteFindByIdResponse>;
  create: CreateFn<AmbienteCreateData['requestBody'], AmbienteCreateResponse>;
  update: UpdateFn<AmbienteUpdateData['requestBody'], AmbienteUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  invalidate: InvalidateFn;
};

export const useAmbientes = (): IUseAmbientes => {
  const api = useApiClient();

  const keys = ['ambientes'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: AmbienteFindAllData) =>
      api.ambientes.ambienteFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: AmbienteFindAllData & { page: number }) =>
      api.ambientes.ambienteFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.ambientes.ambienteFindById({ id }),
  });

  const create = (data: AmbienteCreateData['requestBody']) =>
    api.ambientes.ambienteCreate({ requestBody: data });

  const update = (id: string, data: AmbienteUpdateData['requestBody']) =>
    api.ambientes.ambienteUpdate({ id, requestBody: data });

  const remove = (id: string) => api.ambientes.ambienteDeleteOneById({ id });

  const uploadCover = (id: string, file: Blob) =>
    api.ambientes.ambienteUpdateImagemCapa({ id, formData: { file } });

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
