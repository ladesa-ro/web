import { useQuery } from '@tanstack/vue-query';

import { refDebounced } from '@vueuse/core';

export const useApiOfertaFormacaoFindAll = async (
  searchTerm: MaybeRef<string>
) => {
  const apiClient = useApiClient();
  const query = useQuery({
    queryKey: ['ofertaformacao', searchTerm],

    queryFn: async () => {
      return apiClient.ofertasFormacoes.ofertaFormacaoList({
        search: unref(searchTerm),
      });
    },
  });

  const ofertaformacao = computed(() => unref(query.data)?.data ?? []);

  const ofertaformacaoDebounced = refDebounced(ofertaformacao, 200);

  await query.suspense();

  return {
    query,
    ofertaformacao,
    ofertaformacaoDebounced,
  };
};
