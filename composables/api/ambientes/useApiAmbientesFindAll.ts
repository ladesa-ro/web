import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';

export const useApiAmbientesFindAll = async (
  searchTerm: MaybeRef<string | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['ambientes', searchTerm],

    queryFn: async () => {
      return apiClient.ambientes.ambienteList({
        search: unref(searchTerm),
        sortBy: ['nome:ASC'],
      });
    },
  });

  const ambientes = computed(() => unref(query.data)?.data ?? []);
  const ambientesDebounced = refDebounced(ambientes, 200);

  await query.suspense();

  return {
    query,
    ambientes,
    ambientesDebounced,
  };
};
