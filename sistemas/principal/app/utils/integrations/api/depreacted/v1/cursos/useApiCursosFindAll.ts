import type { CursoListData } from '@ladesa-ro/api-client-fetch';
import { useApiBaseResourceList, type QuerySuspenseBehaviour } from '~/utils';

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
  } = await useApiBaseResourceList(
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
