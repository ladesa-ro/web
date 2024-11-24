import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiDisciplinasFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: [
      'disciplinas',
      computed(() => `disciplina::id::${unref(idRef)}`),
    ],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.disciplinas.disciplinaFindOneById({
          id: id,
        });
      } else {
        return null;
      }
    },
  });

  const disciplina = computed(() => unref(query.data) ?? null);

  await query.suspense();

  return {
    query,
    disciplina,
  };
};
