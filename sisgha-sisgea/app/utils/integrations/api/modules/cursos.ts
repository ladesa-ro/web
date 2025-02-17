import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICursoApiModuleTypings = {
  CompleteView: ApiClientTypings.CursoFindOneResultView;

  Create: {
    Data: ApiClientTypings.CursoInputCreateView;
    Result: ApiClientTypings.CursoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.CursoFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.CursoListResultView;
    Queries: ApiClientTypings.CursoListData;
    ResultItem: ApiClientTypings.CursoListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.CursoInputUpdateView;
    Result: ApiClientTypings.CursoUpdateOneByIdResponse;
  };
};

export const createCursosCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['cursos'],

    create(requestBody) {
      return apiClient.cursos.cursoCreate({ requestBody });
    },

    list(data) {
      return apiClient.cursos.cursoList(data);
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
