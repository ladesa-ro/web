import type * as ApiClientTypings from '~/helpers/api-client';
import type {
  IGenericCrudModule,
  IGenericCrudModuleTypes,
} from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IBlocosApiModuleTypings = IGenericCrudModuleTypes<{
  CompleteView: ApiClientTypings.BlocoFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.BlocoCreateInputDto;
    Result: ApiClientTypings.BlocoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.BlocoFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.BlocoListOutputDto;
    Queries: ApiClientTypings.BlocoFindAllData;
    ResultItem: ApiClientTypings.BlocoListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.BlocoUpdateInputDto;
    Result: ApiClientTypings.BlocoUpdateResponse;
  };
}>;

export type IBlocosApiModule = ReturnType<typeof createBlocosCrudModule>;

export const createBlocosCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['blocos'],

    create(requestBody) {
      return apiClient.blocos.blocoCreate({ requestBody });
    },

    list(data, contextCampiRef) {
      const contextCampi = unref(contextCampiRef);

      return apiClient.blocos.blocoFindAll({
        ...data,
        filterCampusId: contextCampi ? [contextCampi] : undefined,
      });
    },

    getOne(id) {
      return apiClient.blocos.blocoFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.blocos.blocoUpdate({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.blocos.blocoDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IBlocosApiModuleTypings>;
});
