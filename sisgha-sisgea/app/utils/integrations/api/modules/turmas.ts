import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ITurmaApiModuleTypings = {
  CompleteView: ApiClientTypings.TurmaFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.TurmaCreateInputDto;
    Result: ApiClientTypings.TurmaCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.TurmaFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.TurmaListOutputDto;
    Queries: ApiClientTypings.TurmaFindAllData;
    ResultItem: ApiClientTypings.TurmaListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.TurmaUpdateInputDto;
    Result: ApiClientTypings.TurmaUpdateResponse;
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
      return apiClient.turmas.turmaFindAll(data);
    },

    getOne(id) {
      return apiClient.turmas.turmaFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.turmas.turmaUpdate({ id, requestBody });
    },

    deleteOne(id) {
      return apiClient.turmas.turmaDeleteOneById({ id });
    },

    extra: true,
  } satisfies IGenericCrudModule<ITurmaApiModuleTypings>;
});
