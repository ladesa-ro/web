import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type INivelFormacaoApiModuleTypings = {
  CompleteView: ApiClientTypings.NivelFormacaoFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.NivelFormacaoCreateInputDto;
    Result: ApiClientTypings.NivelFormacaoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.NivelFormacaoFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.NivelFormacaoListOutputDto;
    Queries: ApiClientTypings.NivelFormacaoFindAllData;
    ResultItem: ApiClientTypings.NivelFormacaoListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.NivelFormacaoUpdateInputDto;
    Result: ApiClientTypings.NivelFormacaoUpdateResponse;
  };
};

export const createNiveisFormacoesCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['niveis-formacoes'],

    create(requestBody) {
      return apiClient.niveisFormacoes.nivelFormacaoCreate({ requestBody });
    },

    list(data) {
      return apiClient.niveisFormacoes.nivelFormacaoFindAll(data);
    },

    getOne(id) {
      return apiClient.niveisFormacoes.nivelFormacaoFindById({ id });
    },

    updateOne(id, requestBody) {
      return apiClient.niveisFormacoes.nivelFormacaoUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.niveisFormacoes.nivelFormacaoDeleteOneById({ id });
    },
  } satisfies IGenericCrudModule<INivelFormacaoApiModuleTypings>;
});
