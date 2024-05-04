import { useQuery } from "@tanstack/vue-query";

export const useApiCampusFindAll = async (searchTerm: MaybeRef<string>) => {

  const apiClient = useApiClient();
  const query = useQuery({
    queryKey: ["campi", searchTerm],

    queryFn: async () => {
      return apiClient.campi.campusFindAll({
        search: unref(searchTerm)
      })
    },
  });

  const campi = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    campi,
  };
};

