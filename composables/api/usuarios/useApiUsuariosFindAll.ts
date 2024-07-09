import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';

export const useApiUsuariosFindAll = async (
  searchTerm: MaybeRef<string | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['usuarios', searchTerm],

    queryFn: async () => {
      return apiClient.usuarios.usuarioList({
        search: unref(searchTerm),
      });
    },
  });

  const usuarios = computed(() => unref(query.data)?.data ?? []);
  const usuariosDebounced = refDebounced(usuarios, 200);

  await query.suspense();

  return {
    query,
    usuarios,
    usuariosDebounced,
  };
};
