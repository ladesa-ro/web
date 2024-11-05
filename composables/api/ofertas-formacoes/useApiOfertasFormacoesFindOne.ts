import { useQuery } from '@tanstack/vue-query';
import { type MaybeRef, computed, unref } from 'vue';

export const useApiOfertasFormacoesFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: [
      'ofertasFormacoes',
      computed(() => `ofertaFormacao::id::${unref(idRef)}`),
    ],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.ofertasFormacoes.ofertaFormacaoFindOneById({
          id: id,
        });
      } else {
        return null;
      }
    },
  });

  const ofertaFormacao = computed(() => unref(query.data) ?? null);

  return { query, ofertaFormacao };
};
