import { useQuery } from '@tanstack/vue-query';

export const useApiUsuarioPerfisAtivos = async (
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
        return apiClient.perfis.perfilFindAll({
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
