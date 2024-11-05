import { useQuery } from '@tanstack/vue-query';
import { type MaybeRef, computed, unref } from 'vue';

export const useApiUsuariosFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['usuarios', computed(() => `usuario::id::${unref(idRef)}`)],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.usuarios.usuarioFindOneById({
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
