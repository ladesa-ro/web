import { useQuery } from '@tanstack/vue-query';

export const useApiOfertaFormacaoFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: [
      'ofertasformacoes',
      computed(() => `ofertaformacao::id::${unref(idRef)}`),
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

  const ofertaformacao = computed(() => unref(query.data) ?? null);

  return { query, ofertaformacao };
};
