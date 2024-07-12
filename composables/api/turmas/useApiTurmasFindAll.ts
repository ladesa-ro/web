import type { TurmaListData } from '@ladesa-ro/api-client-fetch';
import { useBaseApiSearch } from '../../../integrations/api/base/useBaseApiSearch';

export const useApiTurmasFindAll = async (
  searchTerm: MaybeRef<string | undefined>
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
    data
  );

  return {
    isLoading,
    query,
    turmas,
    previousItems,
  };
};
