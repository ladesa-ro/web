import { useApiBaseResourceGet } from '../base';
import { useAmbienteGetRetriever } from './useAmbienteGetRetriever';

export const useAmbienteGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const ambienteGetRetriever = useAmbienteGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['ambientes'],
    apiResourceGetRetriever: ambienteGetRetriever,
  });
};
