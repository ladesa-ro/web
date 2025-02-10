import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICampusApiModuleTypings = {
  CompleteView: ApiClientTypings.CampusFindOneResultView;

  Create: {
    Data: ApiClientTypings.CampusInputCreateView;
    Result: ApiClientTypings.CampusCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.CampusFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.CampusListResultView;
    Queries: ApiClientTypings.CampusListData;
    ResultItem: ApiClientTypings.CampusListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.CampusInputUpdateView;
    Result: ApiClientTypings.CampusUpdateOneByIdResponse;
  };
};

export const createCampiCrudModule = withApiClient((apiClient) => {
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
