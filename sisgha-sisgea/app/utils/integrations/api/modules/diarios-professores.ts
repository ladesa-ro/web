import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IDiarioProfessorApiModuleTypings = {
  CompleteView: ApiClientTypings.DiarioProfessorFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.DiarioProfessorBulkReplaceInputDto;
    Result: ApiClientTypings.DiarioProfessorBulkReplaceResponse;
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
    Data: ApiClientTypings.DiarioProfessorBulkReplaceInputDto;
    Result: ApiClientTypings.DiarioProfessorBulkReplaceResponse;
  };
};

export const createDiariosProfessoresCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['diarios-professores'],

    create(requestBody: any) {
      return apiClient.diarios.diarioProfessorBulkReplace(requestBody);
    },

    list(data: any) {
      return apiClient.diarios.diarioProfessorFindAll(data);
    },

    getOne(_id: string): Promise<any> {
      return Promise.reject(new Error('DiarioProfessor findById não disponível'));
    },

    updateOne(_id: string, requestBody: any) {
      return apiClient.diarios.diarioProfessorBulkReplace(requestBody);
    },

    deleteOne(_id: string): Promise<any> {
      return Promise.reject(new Error('DiarioProfessor delete não disponível'));
    },
  } satisfies IGenericCrudModule<IDiarioProfessorApiModuleTypings>;
});
