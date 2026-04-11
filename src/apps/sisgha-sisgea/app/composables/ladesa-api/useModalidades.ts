import {
  createListQuery,
  createInfiniteListQuery,
  createFindOneQuery,
  createInvalidate,
  createImageBlobQuery,
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
  ImageBlobFn,
} from '~/composables/query-helpers';
import {
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
  createUploadImageFn,
} from './-helpers/crudHelpers';
import {
  modalidadeFindAll,
  modalidadeFindById,
  modalidadeCreate,
  modalidadeUpdate,
  modalidadeDeleteOneById,
  modalidadeUpdateImagemCapa,
  modalidadeGetImagemCapa,
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
  uploadCover: UploadCoverFn;
  imageCover: ImageBlobFn;
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

  const create = createCreateFn<
    ReqBody<ModalidadeCreateData>,
    ModalidadeCreateResponse
  >(api, modalidadeCreate);
  const update = createUpdateFn<
    ReqBody<ModalidadeUpdateData>,
    ModalidadeUpdateResponse
  >(api, modalidadeUpdate);
  const remove = createRemoveFn(api, modalidadeDeleteOneById);
  const uploadCover = createUploadImageFn(api, modalidadeUpdateImagemCapa);

  const imageCover = createImageBlobQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(modalidadeGetImagemCapa, { path: { id } }),
  });

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
    imageCover,
    invalidate,
  };
};
