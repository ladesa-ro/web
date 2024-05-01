import { useQuery } from "@tanstack/vue-query";
import { TurmasService } from "../../../infrastructure/api/generated";

export const useApiTurmasFindAll = async (searchTerm: MaybeRef<string>) => {
  const query = useQuery({
    queryKey: ["turmas", searchTerm],

    queryFn: async () => {
      return TurmasService.turmaControllerTurmaFindAll(undefined, undefined, unref(searchTerm), "nome:ASC"); 
    },
  });

  const turmas = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    turmas,
  };
};
