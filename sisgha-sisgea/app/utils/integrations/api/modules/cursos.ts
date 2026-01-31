import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type ICursoApiModuleTypings = {
  CompleteView: ApiClientTypings.CursoFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.CursoCreateInputDto;
    Result: ApiClientTypings.CursoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.CursoFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.CursoListOutputDto;
    Queries: ApiClientTypings.CursoFindAllData;
    ResultItem: ApiClientTypings.CursoListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.CursoUpdateInputDto;
    Result: ApiClientTypings.CursoUpdateResponse;
  };
};

export const createCursosCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['cursos'],

    create(requestBody) {
      return apiClient.cursos.cursoCreate({ requestBody });
    },

    list(data, contextCampiRef) {
      const contextCampi = unref(contextCampiRef);
      return apiClient.cursos.cursoFindAll({
        ...data,
        filterCampusId: contextCampi ? [contextCampi] : undefined,
      });
    },

    getOne(id) {
      return apiClient.cursos.cursoFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.cursos.cursoUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.cursos.cursoDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<ICursoApiModuleTypings>;
});
