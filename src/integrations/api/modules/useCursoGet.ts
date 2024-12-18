import { useApiBaseResourceGet } from '../base';
import { useCursoGetRetriever } from './useCursoGetRetriever';

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
