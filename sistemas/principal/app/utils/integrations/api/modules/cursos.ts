import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import { createLadesaApiClientCrudModule } from '../generic';

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
  };

  Update: {
    Data: ApiClientTypings.CursoInputUpdateView;
    Result: ApiClientTypings.CursoUpdateOneByIdResponse;
  };
};

export const createCursosCrudModule =
  createLadesaApiClientCrudModule<ICursoApiModuleTypings>((apiClient) => {
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
    };
  });
