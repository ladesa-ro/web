import type { CursoListData } from '@ladesa-ro/api-client-fetch';
import {
  useBaseApiSearch,
  type QuerySuspenseBehaviour,
} from '../../../integrations';

export const useApiCursosFindAll = async (
  searchTerm: MaybeRef<string>,
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
    items: cursos,
  } = await useBaseApiSearch(
    ['cursos'],
    (data: CursoListData) => apiClient.cursos.cursoList(data),
    data,
    suspenseBehaviour
  );

  return {
    isLoading,
    query,
    cursos,
    previousItems,
  };
};
