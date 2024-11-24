import { useApiBaseResourceGet } from '../base';
import { useOfertaFormacaoGetRetriever } from './useOfertaFormacaoGetRetriever';

export const useOfertaFormacaoGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const OfertaFormacaoGetRetriever = useOfertaFormacaoGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: ['ofertaformacao'],
    apiResourceGetRetriever: OfertaFormacaoGetRetriever,
  });
};
