import type { CursoListData } from '@ladesa-ro/api-client-fetch';

export const campiBaseQueryKey = ['campi'];

export const useCampiRetriever = () => {
  const apiClient = useApiClient();

  return (data: CursoListData) => {
    return apiClient.campi.campusList(data);
  };
};
