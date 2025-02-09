import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import { createLadesaApiClientCrudModule } from '../core/generic';

export type IAmbienteApiModuleTypings = {
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
};

export const createAmbientesCrudModule =
  createLadesaApiClientCrudModule<IAmbienteApiModuleTypings>((apiClient) => {
    return {
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
    };
  });
