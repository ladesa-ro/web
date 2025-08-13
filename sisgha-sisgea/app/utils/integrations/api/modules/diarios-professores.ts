import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDiarioProfessorApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioProfessorFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioProfessorCreateInput;
    Result: ApiClientTypings.DiarioProfessorCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioProfessorFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioProfessorListOutput;
    Queries: ApiClientTypings.DiarioProfessorListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioProfessorListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DiarioProfessorUpdateInput;
    Result: ApiClientTypings.DiarioProfessorUpdateOneByIdResponse;
  };
};

export const createDiariosProfessoresCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['diarios-professores'],

    create(requestBody) {
      return apiClient.diariosProfessores.diarioProfessorCreate({
        requestBody,
      });
    },

    list(data) {
      return apiClient.diariosProfessores.diarioProfessorList(data);
    },

    getOne(id) {
      return apiClient.diariosProfessores.diarioProfessorFindOneById({
        id,
      });
    },

    updateOne(id, requestBody) {
      return apiClient.diariosProfessores.diarioProfessorUpdateOneById({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.diariosProfessores.diarioProfessorDeleteOneById({
        id,
      });
    },
  } satisfies IGenericCrudModule<IDiarioProfessorApiModuleTypings>;
});
