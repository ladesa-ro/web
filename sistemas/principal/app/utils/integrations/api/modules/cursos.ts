import type { CursoListData } from '@ladesa-ro/api-client-fetch';
import { useApiBaseResourceGet } from '../base';

export const cursosBaseQueryKey = ['cursos'];

export const useCursoGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const cursoGetRetriever = useCursoGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['cursos'],
    apiResourceGetRetriever: cursoGetRetriever,
  });
};
export const useCursoGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.cursos.cursoFindOneById({ id });
  };
};

export const useCursosRetriever = () => {
  const apiClient = useApiClient();

  return (data: CursoListData) => {
    return apiClient.cursos.cursoList(data);
  };
};
