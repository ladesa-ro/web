import type { ModalidadeListData } from '@ladesa-ro/api-client-fetch';

export const modalidadesBaseQueryKey = ['modalidades'];

export const useModalidadesRetriever = () => {
  const apiClient = useApiClient();

  return (data: ModalidadeListData) => {
    return apiClient.modalidades.modalidadeList(data);
  };
};
