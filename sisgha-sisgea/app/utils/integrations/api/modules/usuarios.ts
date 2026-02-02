import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IUsuarioApiModuleTypings = {
  CompleteView: ApiClientTypings.UsuarioFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.UsuarioCreateInputDto;
    Result: ApiClientTypings.UsuarioCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.UsuarioFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.UsuarioListOutputDto;
    Queries: ApiClientTypings.UsuarioFindAllData;
    ResultItem: ApiClientTypings.UsuarioListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.UsuarioUpdateInputDto;
    Result: ApiClientTypings.UsuarioUpdateResponse;
  };
};

export const createUsuariosCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['usuarios'],

    create(requestBody) {
      return apiClient.usuarios.usuarioCreate({ requestBody });
    },

    list(data) {
      return apiClient.usuarios.usuarioFindAll(data);
    },

    getOne(id) {
      return apiClient.usuarios.usuarioFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.usuarios.usuarioUpdate({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.usuarios.usuarioDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IUsuarioApiModuleTypings>;
});
