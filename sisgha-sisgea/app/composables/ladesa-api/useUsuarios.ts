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
  UploadProfileFn,
} from '~/composables/query-helpers';
import {
  usuarioFindAll,
  usuarioFindById,
  usuarioCreate,
  usuarioUpdate,
  usuarioDeleteOneById,
  usuarioUpdateImagemPerfil,
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
  listInfinite: ListInfiniteFn<UsuarioFindAllResponse, ReqQuery<UsuarioFindAllData>>;
  findOne: FindOneFn<UsuarioFindByIdResponse>;
  create: CreateFn<ReqBody<UsuarioCreateData>, UsuarioCreateResponse>;
  update: UpdateFn<ReqBody<UsuarioUpdateData>, UsuarioUpdateResponse>;
  remove: RemoveFn;
  uploadProfile: UploadProfileFn;
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

  const create = (data: ReqBody<UsuarioCreateData>) =>
    api.call(usuarioCreate, { body: data });

  const update = (id: string, data: ReqBody<UsuarioUpdateData>) =>
    api.call(usuarioUpdate, { path: { id }, body: data });

  const remove = (id: string) =>
    api.call(usuarioDeleteOneById, { path: { id } });

  const uploadProfile = (id: string, file: Blob) =>
    api.call(usuarioUpdateImagemPerfil, { path: { id }, body: { file } });

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
    invalidate,
  };
};
