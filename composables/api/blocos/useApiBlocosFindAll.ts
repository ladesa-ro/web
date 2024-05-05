import { useQuery } from "@tanstack/vue-query";

export const useApiBlocosFindAll = async (searchTerm: MaybeRef<string>) => {

  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ["blocos", searchTerm],

    queryFn: async () => {
      return apiClient.blocos.blocoFindAll({
        search: unref(searchTerm)
      })
    }
  });

  const blocos = computed(() => unref(query.data)?.data ?? []);
  await query.suspense();


  return {
    query,
    blocos,
  };
};

