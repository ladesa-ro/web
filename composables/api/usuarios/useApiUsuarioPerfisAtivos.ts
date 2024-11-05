import { useQuery } from '@tanstack/vue-query';
import { type MaybeRef, computed, unref } from 'vue';

export const useApiUsuarioPerfisAtivos = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: [
      'usuarios',
      computed(() => `usuario::id::${unref(idRef)}`),
      'perfis_ativos',
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

  const perfisAtivos = computed(() => unref(query.data)?.data ?? null);

  await query.suspense();

  return { query, perfisAtivos };
};
