export const useDisciplinaGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.disciplinas.disciplinaFindOneById({ id });
  };
};
