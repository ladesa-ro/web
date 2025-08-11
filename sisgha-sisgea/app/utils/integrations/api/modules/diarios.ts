import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDiarioApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioCreateInput;
    Result: ApiClientTypings.DiarioCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioListOutput;
    Queries: ApiClientTypings.DiarioListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioUpdateInput;
    Result: ApiClientTypings.DiarioUpdateOneByIdResponse;
  };
};

export const createDiariosCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['diarios'],

    create(requestBody) {
      return apiClient.diarios.diarioCreate({ requestBody });
    },

    list(data) {
      return apiClient.diarios.diarioList(data);
    },

    getOne(id) {
      return apiClient.diarios.diarioFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.diarios.diarioUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.diarios.diarioDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IDiarioApiModuleTypings>;
});
