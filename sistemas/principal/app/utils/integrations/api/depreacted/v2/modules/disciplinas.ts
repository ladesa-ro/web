import type { DisciplinaListData } from '@ladesa-ro/api-client-fetch';
import { useApiBaseResourceGet } from '../base';

export const useDisciplinaGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const disciplinaGetRetriever = useDisciplinaGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['disciplinas'],
    apiResourceGetRetriever: disciplinaGetRetriever,
  });
};
export const useDisciplinaGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.disciplinas.disciplinaFindOneById({ id });
  };
};
export const disciplinasBaseQueryKey = ['disciplinas'];

export const useDisciplinasRetriever = () => {
  const apiClient = useApiClient();

  return (data: DisciplinaListData) => {
    return apiClient.disciplinas.disciplinaList(data);
  };
};
