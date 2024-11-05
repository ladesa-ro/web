import type { CursoListData } from '@ladesa-ro/api-client-fetch';

export const cursosBaseQueryKey = ['cursos'];

export const useCursosRetriever = () => {
  const apiClient = useApiClient();

  return (data: CursoListData) => {
    return apiClient.cursos.cursoList(data);
  };
};
