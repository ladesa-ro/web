import { useQuery } from '@tanstack/vue-query';
import { type MaybeRef, computed, unref } from 'vue';

export const useApiBlocosFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['blocos', computed(() => `blocos::id::${unref(idRef)}`)],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.blocos.blocoFindOneById({
          id: id,
        });
      } else {
        return null;
      }
    },
  });

  const bloco = computed(() => unref(query.data) ?? null);

  await query.suspense();

  return { query, bloco };
};
