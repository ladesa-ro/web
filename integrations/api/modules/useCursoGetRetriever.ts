export const useCursoGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.cursos.cursoFindOneById({ id });
  };
};
