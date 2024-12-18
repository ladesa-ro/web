import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiUsuarioVinculosAtivos = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: [
      'usuarios',
      computed(() => `usuario::id::${unref(idRef)}`),
      'vinculos_ativos',
    ],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.perfis.perfilList({
          filterUsuarioId: [id],
          filterAtivo: ['true'],
        });
      } else {
        return null;
      }
    },
  });

  const vinculosAtivos = computed(() => unref(query.data)?.data ?? null);

  await query.suspense();

  return { query, vinculosAtivos };
};
