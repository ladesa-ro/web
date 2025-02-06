import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import { createLadesaApiClientCrudModule } from '../core/generic';

export type ITurmaApiModuleTypings = {
  CompleteView: ApiClientTypings.TurmaFindOneResultView;

  Create: {
    Data: ApiClientTypings.TurmaInputCreateView;
    Result: ApiClientTypings.TurmaCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.TurmaFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.TurmaListResultView;
    Queries: ApiClientTypings.TurmaListData;
    ResultItem: ApiClientTypings.TurmaListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.TurmaInputUpdateView;
    Result: ApiClientTypings.TurmaUpdateOneByIdResponse;
  };
};

export const createTurmasCrudModule =
  createLadesaApiClientCrudModule<ITurmaApiModuleTypings>((apiClient) => {
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
    };
  });
