import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDiarioProfessorApiModuleTypings = {
  CompleteView: ApiClientTypings.DiarioProfessorFindOneResultView;

  Create: {
    Data: ApiClientTypings.DiarioProfessorInputCreateView;
    Result: ApiClientTypings.DiarioProfessorCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.DiarioProfessorFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.DiarioProfessorListResultView;
    Queries: ApiClientTypings.DiarioProfessorListData;
    ResultItem: ApiClientTypings.DiarioProfessorListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.DiarioProfessorInputUpdateView;
    Result: ApiClientTypings.DiarioProfessorUpdateOneByIdResponse;
  };
};

export const createDiariosProfessoresCrudModule = withApiClient((apiClient) => {
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
