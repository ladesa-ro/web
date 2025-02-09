import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import { createLadesaApiClientCrudModule } from '../core/generic';

export type IDisciplinaApiModuleTypings = {
  CompleteView: ApiClientTypings.DisciplinaFindOneResultView;

  Create: {
    Data: ApiClientTypings.DisciplinaInputCreateView;
    Result: ApiClientTypings.DisciplinaCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.DisciplinaFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.DisciplinaListResultView;
    Queries: ApiClientTypings.DisciplinaListData;
    ResultItem: ApiClientTypings.DisciplinaListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.DisciplinaInputUpdateView;
    Result: ApiClientTypings.DisciplinaUpdateOneByIdResponse;
  };
};

export const createDisciplinasCrudModule =
  createLadesaApiClientCrudModule<IDisciplinaApiModuleTypings>((apiClient) => {
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
    };
  });
