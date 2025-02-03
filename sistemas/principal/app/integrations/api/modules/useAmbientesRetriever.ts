import type { AmbienteListData } from '@ladesa-ro/api-client-fetch';

export const ambientesBaseQueryKey = ['ambientes'];

export const useAmbientesRetriever = () => {
  const apiClient = useApiClient();

  return (data: AmbienteListData) => {
    return apiClient.ambientes.ambienteList(data);
  };
};
