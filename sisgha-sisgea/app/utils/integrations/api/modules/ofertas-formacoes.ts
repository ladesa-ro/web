import type * as ApiClientTypings from '~/helpers/api-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IOfertaFormacaoApiModuleTypings = {
  CompleteView: ApiClientTypings.OfertaFormacaoFindOneOutputDto;

  Create: {
    Data: ApiClientTypings.OfertaFormacaoCreateInputDto;
    Result: ApiClientTypings.OfertaFormacaoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.OfertaFormacaoFindOneOutputDto;
  };

  List: {
    Result: ApiClientTypings.OfertaFormacaoListOutputDto;
    Queries: ApiClientTypings.OfertaFormacaoFindAllData;
    ResultItem: ApiClientTypings.OfertaFormacaoListOutputDto['data'][number];
  };

  Update: {
    Data: ApiClientTypings.OfertaFormacaoUpdateInputDto;
    Result: ApiClientTypings.OfertaFormacaoUpdateResponse;
  };
};

export const createOfertasFormacoesCrudModule = withApiClient(apiClient => {
  return {
    baseQueryKeys: ['ofertas-formacoes'],

    create(requestBody) {
      return apiClient.ofertasFormacoes.ofertaFormacaoCreate({
        requestBody,
      });
    },

    list(data) {
      return apiClient.ofertasFormacoes.ofertaFormacaoFindAll(data);
    },

    getOne(id) {
      return apiClient.ofertasFormacoes.ofertaFormacaoFindById({
        id,
      });
    },

    updateOne(id, requestBody) {
      return apiClient.ofertasFormacoes.ofertaFormacaoUpdate({
        id,
        requestBody,
      });
    },

    deleteOne(id) {
      return apiClient.ofertasFormacoes.ofertaFormacaoDeleteOneById({
        id,
      });
    },
  } satisfies IGenericCrudModule<IOfertaFormacaoApiModuleTypings>;
});
