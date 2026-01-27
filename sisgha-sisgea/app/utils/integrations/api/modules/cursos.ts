import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICursoApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CursoFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CursoCreateInput;
    Result: ApiClientTypings.CursoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CursoFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CursoListOutput;
    Queries: ApiClientTypings.CursoListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CursoListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_CursoUpdateInput;
    Result: ApiClientTypings.CursoUpdateOneByIdResponse;
  };
};

export const createCursosCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['cursos'],

    create(requestBody) {
      return apiClient.cursos.cursoCreate({ requestBody });
    },

    list(data, contextCampiRef) {
      const contextCampi = unref(contextCampiRef);
      return apiClient.cursos.cursoList({
        ...data,
        filterCampusId: contextCampi ? [contextCampi] : undefined,
      });
    },

    getOne(id) {
      return apiClient.cursos.cursoFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.cursos.cursoUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.cursos.cursoDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<ICursoApiModuleTypings>;
});
