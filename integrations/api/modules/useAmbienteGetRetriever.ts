export const useAmbienteGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.ambientes.ambienteFindById({ id });
  };
};
