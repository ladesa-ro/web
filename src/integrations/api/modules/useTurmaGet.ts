import { useApiBaseResourceGet } from '../base';
import { useTurmaGetRetriever } from './useTurmaGetRetriever';

export const useTurmaGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const turmaGetRetriever = useTurmaGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['turmas'],
    apiResourceGetRetriever: turmaGetRetriever,
  });
};
