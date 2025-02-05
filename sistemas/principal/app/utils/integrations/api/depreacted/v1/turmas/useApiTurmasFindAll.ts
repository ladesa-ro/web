import type { TurmaListData } from '@ladesa-ro/api-client-fetch';
import type {
  
  QuerySuspenseBehaviour,
} from '~/utils';
import type { IApiCoreListInput } from '../../../core/typings';

export const useApiTurmasFindAll = async (
  searchTerm: MaybeRef<string | undefined>,
  suspenseBehaviour?: QuerySuspenseBehaviour
) => {
  const apiClient = useApiClient();

  const data = computed(() => {
    return {
      search: unref(searchTerm),
    } satisfies IApiCoreListInput;
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
