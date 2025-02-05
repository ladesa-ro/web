import type { OfertaFormacaoListData } from '@ladesa-ro/api-client-fetch';
import { useApiBaseResourceGet } from '../base';

export const ofertasformacoesBaseQueryKey = ['ofertas-formacoes'];

export const useOfertaFormacaoGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const OfertaFormacaoGetRetriever = useOfertaFormacaoGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['ofertas-formacoes'],
    apiResourceGetRetriever: OfertaFormacaoGetRetriever,
  });
};

export const useOfertaFormacaoGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.ofertasFormacoes.ofertaFormacaoFindOneById({ id });
  };
};

export const useOfertasFormacoesRetriever = () => {
  const apiClient = useApiClient();

  return (data: OfertaFormacaoListData) => {
    return apiClient.ofertasFormacoes.ofertaFormacaoList(data);
  };
};
