import { useApiBaseResourceGet } from '../base';
import { useCampusGetRetriever } from './useCampusGetRetriever';

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
