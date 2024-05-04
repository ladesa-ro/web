import { useQuery } from "@tanstack/vue-query";
import { CursosService } from "../../../infrastructure/api/generated";

export const useApiCursosFindAll = async (searchTerm: MaybeRef<string>) => {
  const query = useQuery({
    queryKey: ["cursos", searchTerm],

    queryFn: async () => {
      return CursosService.cursoControllerCursoFindAll(undefined, undefined, unref(searchTerm), undefined, undefined, undefined, undefined, undefined, undefined, undefined, "nome:ASC");
    },
  });

  const cursos = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    cursos,
  };
};
