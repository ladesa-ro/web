import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ITurmaApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_TurmaFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_TurmaCreateInput;
    Result: ApiClientTypings.TurmaCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_TurmaFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_TurmaListOutput;
    Queries: ApiClientTypings.TurmaListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_TurmaListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_TurmaUpdateInput;
    Result: ApiClientTypings.TurmaUpdateOneByIdResponse;
  };
};

export type ITurmaApiModule = ReturnType<typeof createTurmasCrudModule>;

export const createTurmasCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['turmas'],

    create(requestBody) {
      return apiClient.turmas.turmaCreate({ requestBody });
    },

    list(data) {
      return apiClient.turmas.turmaList(data);
    },

    getOne(id) {
      return apiClient.turmas.turmaFindOneById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.turmas.turmaUpdateOneById({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.turmas.turmaDeleteOneById({ id });
    },

    extra: true,
  } satisfies IGenericCrudModule<ITurmaApiModuleTypings>;
});
