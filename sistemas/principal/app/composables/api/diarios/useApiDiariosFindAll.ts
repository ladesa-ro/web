import type { DiarioListData } from '@ladesa-ro/api-client-fetch';
import type {
  IApiBaseResourceListRetrieverInput,
  QuerySuspenseBehaviour,
} from '../../../integrations';
import { useApiBaseResourceList } from '../../../integrations/api/base/list/composables/useApiBaseResourceList';

export const useApiDiariosFindAll = async (
  searchTerm: MaybeRef<string | undefined>,
  listData?: DiarioListData,
  suspenseBehaviour?: QuerySuspenseBehaviour
) => {
  const apiClient = useApiClient();

  const data = computed(() => {
    const search = unref(searchTerm);
    return {
      ...listData,
      search,
    } as IApiBaseResourceListRetrieverInput;
  });

  const {
    query,
    isLoading,
    //
    items,
    previousItems,
  } = await useApiBaseResourceList(
    ['diarios'],
    (data: DiarioListData) => apiClient.diarios.diarioList(data),
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
