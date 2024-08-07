import type { AmbienteListData } from '@ladesa-ro/api-client-fetch';
import {
  useApiBaseResourceList,
  type QuerySuspenseBehaviour,
} from '../../../integrations';

export const useApiAmbientesFindAll = async (
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
    items: ambientes,
  } = await useApiBaseResourceList(
    ['ambientes'],
    (data: AmbienteListData) => apiClient.ambientes.ambienteList(data),
    data,
    suspenseBehaviour
  );

  return {
    isLoading,
    query,
    ambientes,
    previousItems,
  };
};
