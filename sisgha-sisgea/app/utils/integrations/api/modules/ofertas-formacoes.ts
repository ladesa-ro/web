import type * as ApiClientTypings from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IOfertaFormacaoApiModuleTypings = {
  CompleteView: ApiClientTypings.OfertaFormacaoFindOneResultView;

  Create: {
    Data: ApiClientTypings.OfertaFormacaoInputCreateView;
    Result: ApiClientTypings.OfertaFormacaoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.OfertaFormacaoFindOneResultView;
  };

  List: {
    Result: ApiClientTypings.OfertaFormacaoListResultView;
    Queries: ApiClientTypings.OfertaFormacaoListData;
    ResultItem: ApiClientTypings.OfertaFormacaoListResultView['data'][number];
  };

  Update: {
    Data: ApiClientTypings.OfertaFormacaoInputUpdateView;
    Result: ApiClientTypings.OfertaFormacaoUpdateOneByIdResponse;
  };
};

export const createOfertasFormacoesCrudModule = withApiClient((apiClient) => {
  return {
    baseQueryKeys: ['ofertas-formacoes'],

    create(requestBody) {
      return apiClient.ofertasFormacoes.ofertaFormacaoCreate({
        requestBody,
      });
    },

    list(data) {
      return apiClient.ofertasFormacoes.ofertaFormacaoList(data);
    },

    getOne(id) {
      return apiClient.ofertasFormacoes.ofertaFormacaoFindOneById({
        id,
      });
    },

    updateOne(id, requestBody) {
      return apiClient.ofertasFormacoes.ofertaFormacaoUpdateOneById({
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
