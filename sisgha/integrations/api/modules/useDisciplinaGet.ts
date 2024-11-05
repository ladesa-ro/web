import { useApiBaseResourceGet } from '../base';
import { useDisciplinaGetRetriever } from './useDisciplinaGetRetriever';

export const useDisciplinaGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const disciplinaGetRetriever = useDisciplinaGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['disciplinas'],
    apiResourceGetRetriever: disciplinaGetRetriever,
  });
};
