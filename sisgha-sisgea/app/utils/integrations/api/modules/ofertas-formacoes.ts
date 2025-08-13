import type * as ApiClientTypings from '@ladesa-ro/management-service-client';
import type { IGenericCrudModule } from '../../generic-crud';
import { withApiClient } from '../core/generic';

export type IOfertaFormacaoApiModuleTypings = {
  CompleteView: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_OfertaFormacaoFindOneOutput;

  Create: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_OfertaFormacaoCreateInput;
    Result: ApiClientTypings.OfertaFormacaoCreateResponse;
  };

  GetOne: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_OfertaFormacaoFindOneOutput;
  };

  List: {
    Result: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_OfertaFormacaoListOutput;
    Queries: ApiClientTypings.OfertaFormacaoListData;
    ResultItem: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_OfertaFormacaoListOutput['data'][number];
  };

  Update: {
    Data: ApiClientTypings.Ladesa_ManagementService_Domain_Contracts_OfertaFormacaoUpdateInput;
    Result: ApiClientTypings.OfertaFormacaoUpdateOneByIdResponse;
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
