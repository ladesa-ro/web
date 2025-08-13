import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type {
  IGenericCrudModule,
  IGenericCrudModuleTypes,
} from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IBlocosApiModuleTypings = IGenericCrudModuleTypes<{
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_BlocoFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_BlocoCreateInput;
    Result: ApiClientTypings.BlocoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_BlocoFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_BlocoListOutput;
    Queries: ApiClientTypings.BlocoListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_BlocoListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_BlocoUpdateInput;
    Result: ApiClientTypings.BlocoUpdateOneByIdResponse;
  };
}>;

export type IBlocosApiModule = ReturnType<typeof createBlocosCrudModule>;

export const createBlocosCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['blocos'],

    create(requestBody) {
      return apiClient.blocos.blocoCreate({ requestBody });
    },

    list(data) {
      return apiClient.blocos.blocoList(data);
    },

    getOne(id) {
      return apiClient.blocos.blocoFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.blocos.blocoUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.blocos.blocoDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IBlocosApiModuleTypings>;
});
