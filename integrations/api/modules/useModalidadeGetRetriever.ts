export const useModalidadeGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.modalidades.modalidadeFindById({ id });
  };
};
