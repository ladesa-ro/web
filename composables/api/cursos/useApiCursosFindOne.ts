import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiCursosFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['cursos', computed(() => `curso::id::${unref(idRef)}`)],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.cursos.cursoFindById({
          id: id,
        });
      } else {
        return null;
      }
    },
  });

  const curso = computed(() => unref(query.data) ?? null);

  await query.suspense();

  return { query, curso };
};
