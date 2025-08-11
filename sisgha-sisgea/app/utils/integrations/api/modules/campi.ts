import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICampusApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CampusFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CampusCreateInput;
    Result: ApiClientTypings.CampusCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CampusFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CampusListOutput;
    Queries: ApiClientTypings.CampusListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CampusListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CampusUpdateInput;
    Result: ApiClientTypings.CampusUpdateOneByIdResponse;
  };
};

export const createCampiCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['campi'],

    create(requestBody) {
      return apiClient.campi.campusCreate({ requestBody });
    },

    list(data) {
      return apiClient.campi.campusList(data);
    },

    getOne(id) {
      return apiClient.campi.campusFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.campi.campusUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.campi.campusDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<ICampusApiModuleTypings>;
});
