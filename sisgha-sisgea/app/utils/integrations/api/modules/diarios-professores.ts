import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDiarioProfessorApiModuleTypings = {
  CompleteView: ApiClientTypings.DiarioProfessorFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.DiarioProfessorCreateInputDto;
    Result: ApiClientTypings.DiarioProfessorCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.DiarioProfessorFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.DiarioProfessorListOutputDto;
    Queries: ApiClientTypings.DiarioProfessorFindAllData;
    ResultItem: ApiClientTypings.DiarioProfessorListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.DiarioProfessorUpdateInputDto;
    Result: ApiClientTypings.DiarioProfessorUpdateResponse;
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
      return apiClient.diariosProfessores.diarioProfessorFindAll(data);
    },

    getOne(id) {
      return apiClient.diariosProfessores.diarioProfessorFindById({
        id,
      });
    },

    updateOne(id, requestBody) {
      return apiClient.diariosProfessores.diarioProfessorUpdate({
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
