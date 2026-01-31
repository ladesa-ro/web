import type * as ApiClientTypings from '~/helpers/api-client';
import { withApiClient } from '~/utils/integrations/api/core/generic';
import type { IGenericCrudModuleTypes } from '~/utils/integrations/generic-crud/IGenericCrudModuleTypes';

export type IAmbientesApiModuleTypings = IGenericCrudModuleTypes<{
  CompleteView: ApiClientTypings.AmbienteFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.AmbienteCreateInputDto;
    Result: ApiClientTypings.AmbienteCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.AmbienteFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.AmbienteListOutputDto;
    Queries: ApiClientTypings.AmbienteListDataDto;
    ResultItem: ApiClientTypings.AmbienteListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.AmbienteUpdateInputDto;
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

      return apiClient.ambientes.ambienteFindAll({
        ...data,
        filterBlocoCampusId: contextCampi ? [contextCampi] : undefined,
      });
    },

    getOne(id) {
      return apiClient.ambientes.ambienteFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.ambientes.ambienteUpdate({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.ambientes.ambienteDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IAmbientesApiModuleTypings>;
});
