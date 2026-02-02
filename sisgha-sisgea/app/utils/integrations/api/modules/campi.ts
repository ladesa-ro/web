import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICampusApiModuleTypings = {
  CompleteView: ApiClientTypings.CampusFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.CampusCreateInputDto;
    Result: ApiClientTypings.CampusCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.CampusFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.CampusListOutputDto;
    Queries: ApiClientTypings.CampusFindAllData;
    ResultItem: ApiClientTypings.CampusListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.CampusUpdateInputDto;
    Result: ApiClientTypings.CampusUpdateResponse;
  };
};

export const createCampiCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['campi'],

    create(requestBody) {
      return apiClient.campi.campusCreate({ requestBody });
    },

    list(data) {
      return apiClient.campi.campusFindAll(data);
    },

    getOne(id) {
      return apiClient.campi.campusFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.campi.campusUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.campi.campusDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<ICampusApiModuleTypings>;
});
