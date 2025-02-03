import type { AmbienteListData } from '@ladesa-ro/api-client-fetch';
import { useApiBaseResourceGet } from '../base';

export const ambientesBaseQueryKey = ['ambientes'];

export const useAmbientesRetriever = () => {
  const apiClient = useApiClient();

  return (data: AmbienteListData) => {
    return apiClient.ambientes.ambienteList(data);
  };
};

export const useAmbienteGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.ambientes.ambienteFindOneById({ id });
  };
};

export const useAmbienteGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const ambienteGetRetriever = useAmbienteGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ambientesBaseQueryKey,
    apiResourceGetRetriever: ambienteGetRetriever,
  });
};
