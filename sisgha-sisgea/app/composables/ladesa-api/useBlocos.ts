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
  BlocoFindAllData,
  BlocoFindAllResponse,
  BlocoFindByIdResponse,
  BlocoCreateData,
  BlocoCreateResponse,
  BlocoUpdateData,
  BlocoUpdateResponse,
} from '~/helpers/api-client';

export type IUseBlocos = {
  keys: readonly string[];
  list: ListFn<BlocoFindAllResponse, BlocoFindAllData>;
  listInfinite: ListInfiniteFn<BlocoFindAllResponse, BlocoFindAllData>;
  findOne: FindOneFn<BlocoFindByIdResponse>;
  create: CreateFn<BlocoCreateData['requestBody'], BlocoCreateResponse>;
  update: UpdateFn<BlocoUpdateData['requestBody'], BlocoUpdateResponse>;
  remove: RemoveFn;
  uploadCover: UploadCoverFn;
  invalidate: InvalidateFn;
};

export const useBlocos = (): IUseBlocos => {
  const api = useApiClient();

  const keys = ['blocos'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: BlocoFindAllData) => api.blocos.blocoFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: BlocoFindAllData & { page: number }) =>
      api.blocos.blocoFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.blocos.blocoFindById({ id }),
  });

  const create = (data: BlocoCreateData['requestBody']) =>
    api.blocos.blocoCreate({ requestBody: data });

  const update = (id: string, data: BlocoUpdateData['requestBody']) =>
    api.blocos.blocoUpdate({ id, requestBody: data });

  const remove = (id: string) => api.blocos.blocoDeleteOneById({ id });

  const uploadCover = (id: string, file: Blob) =>
    api.blocos.blocoUpdateImagemCapa({ id, formData: { file } });

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
