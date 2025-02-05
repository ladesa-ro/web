import type { BlocoListData } from '@ladesa-ro/api-client-fetch';
import { useApiBaseResourceGet } from '../base';

export const useBlocoGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const blocoGetRetriever = useBlocoGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['blocos'],
    apiResourceGetRetriever: blocoGetRetriever,
  });
};

export const useBlocoGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.blocos.blocoFindOneById({ id });
  };
};
export const blocosBaseQueryKey = ['blocos'];

export const useBlocosRetriever = () => {
  const apiClient = useApiClient();

  return (data: BlocoListData) => {
    return apiClient.blocos.blocoList(data);
  };
};
