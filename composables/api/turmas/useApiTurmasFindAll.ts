import type { TurmaListData } from '@ladesa-ro/api-client-fetch';
import type { QuerySuspenseBehaviour } from '../../../integrations';
import { useBaseApiSearch } from '../../../integrations/api/base/useBaseApiSearch';

export const useApiTurmasFindAll = async (
  searchTerm: MaybeRef<string | undefined>,
  suspenseBehaviour?: QuerySuspenseBehaviour
) => {
  const apiClient = useApiClient();

  const data = computed(() => {
    return {
      search: unref(searchTerm),
    };
  });

  const {
    query,
    isLoading,
    previousItems,
    items: turmas,
  } = await useBaseApiSearch(
    ['turmas'],
    (data: TurmaListData) => apiClient.turmas.turmaList(data),
    data,
    suspenseBehaviour
  );

  return {
    isLoading,
    query,
    turmas,
    previousItems,
  };
};
