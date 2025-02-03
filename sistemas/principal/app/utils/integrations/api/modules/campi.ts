import type { CursoListData } from '@ladesa-ro/api-client-fetch';
import { useApiBaseResourceGet } from '../base';

export const campiBaseQueryKey = ['campi'];

export const useCampiRetriever = () => {
  const apiClient = useApiClient();

  return (data: CursoListData) => {
    return apiClient.campi.campusList(data);
  };
};
export const useCampusGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const campusGetRetriever = useCampusGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['campus'],
    apiResourceGetRetriever: campusGetRetriever,
  });
};
export const useCampusGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.campi.campusFindOneById({ id });
  };
};
