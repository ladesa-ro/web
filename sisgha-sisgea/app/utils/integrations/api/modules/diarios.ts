import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import { createLadesaApiClientCrudModule } from '../core/generic';

export type IDiarioApiModuleTypings = {
  CompleteView: ApiClientTypings.DiarioFindOneResultView;

  Create: {
    Data: ApiClientTypings.DiarioInputCreateView;
    Result: ApiClientTypings.DiarioCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.DiarioFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.DiarioListResultView;
    Queries: ApiClientTypings.DiarioListData;
    ResultItem: ApiClientTypings.DiarioListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.DiarioInputUpdateView;
    Result: ApiClientTypings.DiarioUpdateOneByIdResponse;
  };
};

export const createDiariosCrudModule =
  createLadesaApiClientCrudModule<IDiarioApiModuleTypings>((apiClient) => {
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
    };
  });
