import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDiarioApiModuleTypings = {
  CompleteView: ApiClientTypings.DiarioFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.DiarioCreateInputDto;
    Result: ApiClientTypings.DiarioCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.DiarioFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.DiarioListOutputDto;
    Queries: ApiClientTypings.DiarioListData;
    ResultItem: ApiClientTypings.DiarioListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.DiarioUpdateInputDto;
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
      return apiClient.diarios.diarioFindAll(data);
    },

    getOne(id) {
      return apiClient.diarios.diarioFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.diarios.diarioUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.diarios.diarioDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IDiarioApiModuleTypings>;
});
