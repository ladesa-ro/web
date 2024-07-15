import type { BlocoListData } from '@ladesa-ro/api-client-fetch';

export const useBlocosRetriever = () => {
  const apiClient = useApiClient();

  return (data: BlocoListData) => {
    return apiClient.blocos.blocoList(data);
  };
};
