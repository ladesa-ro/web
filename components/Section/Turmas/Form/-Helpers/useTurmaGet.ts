import { useApiBaseResourceGet } from '../../../../../integrations';
import type { MaybePromise } from '../../../../../typings';

export type IUseTurmaHandleDeleteOptions = {
  afterSuccess?: () => MaybePromise<any>;
};

export const useApiTurmaGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.turmas.turmaFindById({ id });
  };
};

export const useTurmaGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const turmaGetRetriever = useApiTurmaGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['turmas'],
    apiResourceGetRetriever: turmaGetRetriever,
  });
};
