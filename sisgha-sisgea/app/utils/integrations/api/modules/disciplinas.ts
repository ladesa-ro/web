import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDisciplinaApiModuleTypings = {
  CompleteView: ApiClientTypings.DisciplinaFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.DisciplinaCreateInputDto;
    Result: ApiClientTypings.DisciplinaCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.DisciplinaFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.DisciplinaListOutputDto;
    Queries: ApiClientTypings.DisciplinaFindAllData;
    ResultItem: ApiClientTypings.DisciplinaListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.DisciplinaUpdateInputDto;
    Result: ApiClientTypings.DisciplinaUpdateResponse;
  };
};

export const createDisciplinasCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['disciplinas'],

    create(requestBody) {
      return apiClient.disciplinas.disciplinaCreate({ requestBody });
    },

    list(data) {
      return apiClient.disciplinas.disciplinaFindAll(data);
    },

    getOne(id) {
      return apiClient.disciplinas.disciplinaFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.disciplinas.disciplinaUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.disciplinas.disciplinaDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<IDisciplinaApiModuleTypings>;
});
