export const useOfertaFormacaoGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.ofertasFormacoes.ofertaFormacaoFindOneById({ id });
  };
};
