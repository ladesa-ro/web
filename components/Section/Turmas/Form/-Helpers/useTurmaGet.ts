import { useApiBaseResourceGet } from '../../../../../integrations';
import type { MaybePromise } from '../../../../../typings';

export type IUseTurmaHandleDeleteOptions = {
  afterSuccess?: () => MaybePromise<any>;
};

export const useTurmaGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const turmaApiResourceGetRetriever = (id: string) => {
    return apiClient.turmas.turmaFindById({ id });
  };

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['turmas'],
    apiResourceGetRetriever: turmaApiResourceGetRetriever,
  });
};
