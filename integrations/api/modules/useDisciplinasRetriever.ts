import type { DisciplinaListData } from '@ladesa-ro/api-client-fetch';

export const disciplinasBaseQueryKey = ['disciplinas'];

export const useDisciplinasRetriever = () => {
  const apiClient = useApiClient();

  return (data: DisciplinaListData) => {
    return apiClient.disciplinas.disciplinaList(data);
  };
};
