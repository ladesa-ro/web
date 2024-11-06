import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';

export const useApiOfertasFormacoesFindAll = async (
  searchTerm: MaybeRef<string>
) => {
  const apiClient = useApiClient();
  const query = useQuery({
    queryKey: ['ofertas-formacoes', searchTerm],

    queryFn: async () => {
      return apiClient.ofertasFormacoes.ofertaFormacaoList({
        search: unref(searchTerm),
      });
    },
  });

  const ofertasFormacoes = computed(() => unref(query.data)?.data ?? []);

  const ofertasFormacoesDebounced = refDebounced(ofertasFormacoes, 200);

  await query.suspense();

  return {
    query,
    ofertasFormacoes,
    ofertasFormacoesDebounced,
  };
};
