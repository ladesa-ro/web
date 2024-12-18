export const useCampusGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.campi.campusFindOneById({ id });
  };
};
