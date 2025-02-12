import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IUsuarioApiModuleTypings = {
  CompleteView: ApiClientTypings.UsuarioFindOneResultView;

  Create: {
    Data: ApiClientTypings.UsuarioInputCreateView;
    Result: ApiClientTypings.UsuarioCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.UsuarioFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.UsuarioListResultView;
    Queries: ApiClientTypings.UsuarioListData;
    ResultItem: ApiClientTypings.UsuarioListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.UsuarioInputUpdateView;
    Result: ApiClientTypings.UsuarioUpdateOneByIdResponse;
  };
};

export const createUsuariosCrudModule = withApiClient((apiClient) => {
  return {
    baseQueryKeys: ['usuarios'],

    create(requestBody) {
      return apiClient.usuarios.usuarioCreate({ requestBody });
    },

    list(data) {
      return apiClient.usuarios.usuarioList(data);
    },

    getOne(id) {
      return apiClient.usuarios.usuarioFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.usuarios.usuarioUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.usuarios.usuarioDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IUsuarioApiModuleTypings>;
});
