import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import { withApiClient } from '~/utils/integrations/api/core/generic';
import type { IGenericCrudModuleTypes } from '~/utils/integrations/generic-crud/IGenericCrudModuleTypes';

export type IAmbientesApiModuleTypings = IGenericCrudModuleTypes<{
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_AmbienteFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_AmbienteCreateInput;
    Result: ApiClientTypings.AmbienteCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_AmbienteFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_AmbienteListOutput;
    Queries: ApiClientTypings.AmbienteListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_AmbienteListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_AmbienteUpdateInput;
    Result: ApiClientTypings.AmbienteUpdateOneByIdResponse;
  };
}>;

export type IAmbientesApiModule = ReturnType<typeof createAmbientesCrudModule>;

export const createAmbientesCrudModule = withApiClient(apiClient => {
  return {
    __types: {} as IAmbientesApiModuleTypings,

    baseQueryKeys: ['ambientes'],

    create(requestBody) {
      return apiClient.ambientes.ambienteCreate({ requestBody });
    },

    list(data, contextCampiRef) {
      const contextCampi = unref(contextCampiRef);

      return apiClient.ambientes.ambienteList({
        ...data,
        filterBlocoCampusId: contextCampi ? [contextCampi] : undefined,
      });
    },

    getOne(id) {
      return apiClient.ambientes.ambienteFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.ambientes.ambienteUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.ambientes.ambienteDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IAmbientesApiModuleTypings>;
});
