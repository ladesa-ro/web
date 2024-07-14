import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiUsuariosFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['usuarios', computed(() => `usuario::id::${unref(idRef)}`)],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.usuarios.usuarioFindById({
          id: id,
        });
      } else {
        return null;
      }
    },
  });

  const usuario = computed(() => unref(query.data) ?? null);

  await query.suspense();

  return { query, usuario };
};
