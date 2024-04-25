import { useQuery } from "@tanstack/vue-query";
import { AmbientesService } from "../../../infrastructure/api/generated";

export const useApiBlocosFindAll = async (searchTerm: MaybeRef<string>) => {
  const query = useQuery({
    queryKey: ["bloco", searchTerm],

    queryFn: async () => {
      return AmbientesService.ambienteControllerAmbienteFindAll(undefined, undefined, unref(searchTerm));
    },
  });

  const bloco = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    bloco,
  };
};
