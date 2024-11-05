import { useApiBaseResourceGet } from '../base';
import { useModalidadeGetRetriever } from './useModalidadeGetRetriever';

export const useModalidadeGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const modalidadeGetRetriever = useModalidadeGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['modalidades'],
    apiResourceGetRetriever: modalidadeGetRetriever,
  });
};
