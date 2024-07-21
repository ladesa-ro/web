export const useTurmaGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.turmas.turmaFindById({ id });
  };
};
