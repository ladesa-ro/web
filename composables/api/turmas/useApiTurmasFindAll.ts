import { useQuery } from "@tanstack/vue-query";

export const useApiTurmasFindAll = async (searchTerm: MaybeRef<string>) => {

  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ["turmas", searchTerm],

    queryFn: async () => {
      return apiClient.turmas.turmaFindAll({
        search: unref(searchTerm)
      })
    },
  });

  const turmas = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    turmas,
  };
};
