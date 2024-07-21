export const useBlocoGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.blocos.blocoFindById({ id });
  };
};
