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
  UploadProfileFn,
  ImageBlobFn,
} from '~/composables/query-helpers';
import {
  createCreateFn,
  createUpdateFn,
  createRemoveFn,
  createUploadImageFn,
} from './-helpers/crudHelpers';
import {
  usuarioFindAll,
  usuarioFindById,
  usuarioCreate,
  usuarioUpdate,
  usuarioDeleteOneById,
  usuarioUpdateImagemPerfil,
  usuarioGetImagemPerfil,
} from '@ladesa-ro/web.api.client';
import type {
  UsuarioFindAllData,
  UsuarioFindAllResponse,
  UsuarioFindByIdResponse,
  UsuarioCreateData,
  UsuarioCreateResponse,
  UsuarioUpdateData,
  UsuarioUpdateResponse,
  ReqBody,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

export type IUseUsuarios = {
  keys: readonly string[];
  list: ListFn<UsuarioFindAllResponse, ReqQuery<UsuarioFindAllData>>;
  listInfinite: ListInfiniteFn<
    UsuarioFindAllResponse,
    ReqQuery<UsuarioFindAllData>
  >;
  findOne: FindOneFn<UsuarioFindByIdResponse>;
  create: CreateFn<ReqBody<UsuarioCreateData>, UsuarioCreateResponse>;
  update: UpdateFn<ReqBody<UsuarioUpdateData>, UsuarioUpdateResponse>;
  remove: RemoveFn;
  uploadProfile: UploadProfileFn;
  imageProfile: ImageBlobFn;
  invalidate: InvalidateFn;
};

export const useUsuarios = (): IUseUsuarios => {
  const api = useApiClient();

  const keys = ['usuarios'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<UsuarioFindAllData> = {}) => {
      return api.call(usuarioFindAll, { query: params });
    },
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ReqQuery<UsuarioFindAllData> = {}) => {
      return api.call(usuarioFindAll, { query: params });
    },
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(usuarioFindById, { path: { id } }),
  });

  const create = createCreateFn<
    ReqBody<UsuarioCreateData>,
    UsuarioCreateResponse
  >(api, usuarioCreate);
  const update = createUpdateFn<
    ReqBody<UsuarioUpdateData>,
    UsuarioUpdateResponse
  >(api, usuarioUpdate);
  const remove = createRemoveFn(api, usuarioDeleteOneById);
  const uploadProfile = createUploadImageFn(api, usuarioUpdateImagemPerfil);

  const imageProfile = createImageBlobQuery({
    queryKey: keys,
    fetcher: (id: string) => api.call(usuarioGetImagemPerfil, { path: { id } }),
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
    uploadProfile,
    imageProfile,
    invalidate,
  };
};
