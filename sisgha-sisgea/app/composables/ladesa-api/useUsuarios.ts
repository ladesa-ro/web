import { createListQuery, createInfiniteListQuery, createFindOneQuery, createInvalidate } from '~/composables/query-helpers';
import type { ListFn, ListInfiniteFn, FindOneFn, CreateFn, UpdateFn, RemoveFn, InvalidateFn, UploadProfileFn } from '~/composables/query-helpers';
import type {
  UsuarioFindAllData,
  UsuarioFindAllResponse,
  UsuarioFindByIdResponse,
  UsuarioCreateData,
  UsuarioCreateResponse,
  UsuarioUpdateData,
  UsuarioUpdateResponse,
} from '~/helpers/api-client';

export type IUseUsuarios = {
  keys: readonly string[];
  list: ListFn<UsuarioFindAllResponse, UsuarioFindAllData>;
  listInfinite: ListInfiniteFn<UsuarioFindAllResponse, UsuarioFindAllData>;
  findOne: FindOneFn<UsuarioFindByIdResponse>;
  create: CreateFn<UsuarioCreateData['requestBody'], UsuarioCreateResponse>;
  update: UpdateFn<UsuarioUpdateData['requestBody'], UsuarioUpdateResponse>;
  remove: RemoveFn;
  uploadProfile: UploadProfileFn;
  invalidate: InvalidateFn;
};

export const useUsuarios = (): IUseUsuarios => {
  const api = useApiClient();

  const keys = ['usuarios'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: UsuarioFindAllData) =>
      api.usuarios.usuarioFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: UsuarioFindAllData & { page: number }) =>
      api.usuarios.usuarioFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.usuarios.usuarioFindById({ id }),
  });

  const create = (data: UsuarioCreateData['requestBody']) =>
    api.usuarios.usuarioCreate({ requestBody: data });

  const update = (id: string, data: UsuarioUpdateData['requestBody']) =>
    api.usuarios.usuarioUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.usuarios.usuarioDeleteOneById({ id });

  const uploadProfile = (id: string, file: Blob) =>
    api.usuarios.usuarioUpdateImagemPerfil({ id, formData: { file } });

  const invalidate = createInvalidate(keys);

  return { keys, list, listInfinite, findOne, create, update, remove, uploadProfile, invalidate };
};
