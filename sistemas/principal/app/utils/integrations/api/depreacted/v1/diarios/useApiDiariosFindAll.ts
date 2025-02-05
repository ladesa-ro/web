import type { DiarioListData } from '@ladesa-ro/api-client-fetch';
import type { QuerySuspenseBehaviour } from '~/utils';
import type { IApiCoreListInput } from '../../../core/typings';

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
    } as IApiCoreListInput;
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
