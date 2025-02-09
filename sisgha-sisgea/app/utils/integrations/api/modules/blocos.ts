import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import { createLadesaApiClientCrudModule } from '../core/generic';

export type IBlocoApiModuleTypings = {
  CompleteView: ApiClientTypings.BlocoFindOneResultView;

  Create: {
    Data: ApiClientTypings.BlocoInputCreateView;
    Result: ApiClientTypings.BlocoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.BlocoFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.BlocoListResultView;
    Queries: ApiClientTypings.BlocoListData;
    ResultItem: ApiClientTypings.BlocoListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.BlocoInputUpdateView;
    Result: ApiClientTypings.BlocoUpdateOneByIdResponse;
  };
};

export const createBlocosCrudModule =
  createLadesaApiClientCrudModule<IBlocoApiModuleTypings>((apiClient) => {
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
    };
  });
