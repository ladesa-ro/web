import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDisciplinaApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DisciplinaFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DisciplinaCreateInput;
    Result: ApiClientTypings.DisciplinaCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DisciplinaFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DisciplinaListOutput;
    Queries: ApiClientTypings.DisciplinaListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DisciplinaListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_DisciplinaUpdateInput;
    Result: ApiClientTypings.DisciplinaUpdateOneByIdResponse;
  };
};

export const createDisciplinasCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['disciplinas'],

    create(requestBody) {
      return apiClient.disciplinas.disciplinaCreate({ requestBody });
    },

    list(data) {
      return apiClient.disciplinas.disciplinaList(data);
    },

    getOne(id) {
      return apiClient.disciplinas.disciplinaFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.disciplinas.disciplinaUpdateOneById({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.disciplinas.disciplinaDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IDisciplinaApiModuleTypings>;
});
