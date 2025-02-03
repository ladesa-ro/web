import type { TurmaListData } from '@ladesa-ro/api-client-fetch';
import type {
  IApiBaseResourceListRetrieverInput,
  QuerySuspenseBehaviour,
} from '~/utils';

export const useApiTurmasFindAll = async (
  searchTerm: MaybeRef<string | undefined>,
  suspenseBehaviour?: QuerySuspenseBehaviour
) => {
  const apiClient = useApiClient();

  const data = computed(() => {
    return {
      search: unref(searchTerm),
    } satisfies IApiBaseResourceListRetrieverInput;
  });

  const {
    query,
    isLoading,
    //
    items,
    previousItems,
  } = await useApiBaseResourceList(
    ['turmas'],
    (data: TurmaListData) => apiClient.turmas.turmaList(data),
    data,
    suspenseBehaviour
  );

  return {
    query,
    isLoading,
    //
    items,
    previousItems,
  };
};
