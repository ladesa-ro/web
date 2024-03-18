import { useQuery } from "@tanstack/vue-query";
import { CursosService } from "../../../infrastructure/api/generated";

export const useApiCursosFindAll = async () => {
  const query = useQuery({
    queryKey: ["cursos"],
    queryFn: async () => {
      return CursosService.cursoControllerCursoFindAll();
    },
  });

  const cursos = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    cursos,
  };
};
