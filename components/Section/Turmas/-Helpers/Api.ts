import type { TurmaListData } from '@ladesa-ro/api-client-fetch';

export const useTurmasRetriever = () => {
  const apiClient = useApiClient();

  return (data: TurmaListData) => {
    return apiClient.turmas.turmaList(data);
  };
};
