import type { OfertaFormacaoListData } from '@ladesa-ro/api-client-fetch';

export const ofertasformacoesBaseQueryKey = ['ofertasformacoes'];

export const useOfertasFormacoesRetriever = () => {
  const apiClient = useApiClient();

  return (data: OfertaFormacaoListData) => {
    return apiClient.ofertasFormacoes.ofertaFormacaoList(data);
  };
};
