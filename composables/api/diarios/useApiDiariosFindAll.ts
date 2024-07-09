import { useQuery } from '@tanstack/vue-query';

export const useApiDiariosFindAll = async (
  searchTerm: MaybeRef<string | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['diarios', searchTerm],

    queryFn: async () => {
      return apiClient.diarios.diarioList({
        search: unref(searchTerm),
      });
    },
  });

  const diarios = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    diarios,
  };
};
