import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IUsuarioApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_UsuarioFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_UsuarioCreateInput;
    Result: ApiClientTypings.UsuarioCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_UsuarioFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_UsuarioListOutput;
    Queries: ApiClientTypings.UsuarioListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_UsuarioListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_UsuarioUpdateInput;
    Result: ApiClientTypings.UsuarioUpdateOneByIdResponse;
  };
};

export const createUsuariosCrudModule = withApiClient(apiClient => {
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
