import { useQuery } from "@tanstack/vue-query";

export const useApiCursosFindAll = async (searchTerm: MaybeRef<string>) => {

  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ["cursos", searchTerm],

    queryFn: async () => {
      return apiClient.cursos.cursoFindAll({
        search: unref(searchTerm)
      })
    }
  });

  const cursos = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    cursos,
  };
};
