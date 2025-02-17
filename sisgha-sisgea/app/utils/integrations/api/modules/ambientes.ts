import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModuleTypes } from '~/utils/integrations/generic-crud/IGenericCrudModuleTypes';
import { withApiClient } from '~/utils/integrations/api/core/generic';

export type IAmbientesApiModuleTypings = IGenericCrudModuleTypes<{
  CompleteView: ApiClientTypings.AmbienteFindOneResultView;

  Create: {
    Data: ApiClientTypings.AmbienteInputCreateView;
    Result: ApiClientTypings.AmbienteCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.AmbienteFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.AmbienteListResultView;
    Queries: ApiClientTypings.AmbienteListData;
    ResultItem: ApiClientTypings.AmbienteListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.AmbienteInputUpdateView;
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

    list(data) {
      return apiClient.ambientes.ambienteList(data);
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
