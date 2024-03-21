import { useQuery } from "@tanstack/vue-query";
import { CursosService } from "../../../infrastructure/api/generated";

export const useApiCursosFindAll = async (searchTerm: string) => {
  const query = useQuery({
    queryKey: ["cursos", searchTerm],
    
    queryFn: async () => {
      return CursosService.cursoControllerCursoFindAll( undefined, undefined, searchTerm );
    },
  });

  const cursos = computed(() => unref(query.data)?.data ?? []);


  await query.suspense();

  return {
    query,
    cursos,
  };
};
