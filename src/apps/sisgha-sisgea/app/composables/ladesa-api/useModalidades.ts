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
  modalidadeFindAll,
  modalidadeFindById,
  modalidadeCreate,
  modalidadeUpdate,
  modalidadeDeleteOneById,
  modalidadeUpdateImagemCapa,
} from '@ladesa-ro/web.api.client';
import type {
  ModalidadeFindAllData,
  ModalidadeFindAllResponse,
  ModalidadeFindByIdResponse,
  ModalidadeCreateData,
  ModalidadeCreateResponse,
  ModalidadeUpdateData,
  ModalidadeUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseModalidades = {
  keys: readonly string[];
  list: ListFn<ModalidadeFindAllResponse, ReqQuery<ModalidadeFindAllData>>;
  listInfinite: ListInfiniteFn<
    ModalidadeFindAllResponse,
    ReqQuery<ModalidadeFindAllData>
  >;
  findOne: FindOneFn<ModalidadeFindByIdResponse>;
  create: CreateFn<ReqBody<ModalidadeCreateData>, ModalidadeCreateResponse>;
  update: UpdateFn<ReqBody<ModalidadeUpdateData>, ModalidadeUpdateResponse>;
  remove: RemoveFn;
  uploadCover: (id: string, file: Blob) => Promise<any>;
  invalidate: InvalidateFn;
};

export const useModalidades = (): IUseModalidades => {
  const api = useApiClient();

  const keys = ['modalidades'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ReqQuery<ModalidadeFindAllData>) =>
      api.call(modalidadeFindAll, { query: params }),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<ModalidadeFindAllData>) =>
      api.call(modalidadeFindAll, { query: params }),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(modalidadeFindById, { path: { id } }),
  });

  const create = (data: ReqBody<ModalidadeCreateData>) =>
    api.call(modalidadeCreate, { body: data });

  const update = (id: string, data: ReqBody<ModalidadeUpdateData>) =>
    api.call(modalidadeUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(modalidadeDeleteOneById, { path: { id } });

  const uploadCover = (id: string, file: Blob) =>
    api.call(modalidadeUpdateImagemCapa, { path: { id }, body: { file } });

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
