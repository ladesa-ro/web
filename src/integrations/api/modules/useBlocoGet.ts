import { useApiBaseResourceGet } from '../base';
import { useBlocoGetRetriever } from './useBlocoGetRetriever';

export const useBlocoGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const blocoGetRetriever = useBlocoGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['blocos'],
    apiResourceGetRetriever: blocoGetRetriever,
  });
};
