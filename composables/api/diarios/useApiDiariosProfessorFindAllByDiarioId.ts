import { useQuery } from '@tanstack/vue-query';
import { computed, unref } from 'vue';

export const useApiDiariosProfessorFindAllByDiarioId = async (filter: any) => {
  const apiClient = useApiClient();


  if (!filter || !filter.diario || !filter.diario.id) {
    console.error('Diário ou ID do diário não está definido');
    return {
      query: null,
      diariosProfessorList: [],
    };
  }


  const query = useQuery({
    queryKey: ['diarios', filter.diario.id], 

    queryFn: async () => {
      return apiClient.diarioProfessor.diarioProfessorList({
        filterDiarioId: unref(filter.diario.id),
      });
    },
  });


  const diariosProfessorList = computed(() => unref(query.data)?.data ?? []);


  await query.suspense();

  return {
    query,
    diariosProfessorList,
  };
};
