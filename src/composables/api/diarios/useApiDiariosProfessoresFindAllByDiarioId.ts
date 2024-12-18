import { useQuery } from '@tanstack/vue-query';
import { computed, unref } from 'vue';

export const useApiDiariosProfessoresFindAllByDiarioId = async (
  filter: any
) => {
  const apiClient = useApiClient();

  if (!filter || !filter.diario || !filter.diario.id) {
    console.error('Diário ou ID do diário não está definido');
    return {
      query: null,
      diariosProfessoresList: [],
    };
  }

  const query = useQuery({
    queryKey: ['diarios', filter.diario.id],

    queryFn: async () => {
      return apiClient.diariosProfessores.diarioProfessorList({
        filterDiarioId: unref(filter.diario.id),
      });
    },
  });

  const diariosProfessoresList = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    diariosProfessoresList,
  };
};
