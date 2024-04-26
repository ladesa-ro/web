import { useQuery } from "@tanstack/vue-query";
import { AmbientesService } from "../../../infrastructure/api/generated";

export const useApiAmbientesFindAll = async (searchTerm: MaybeRef<string>) => {
  const query = useQuery({
    queryKey: ["ambientes", searchTerm],

    queryFn: async () => {
      return AmbientesService.ambienteControllerAmbienteFindAll(undefined, undefined, unref(searchTerm)); 
    },
  });

  const ambientes = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    ambientes,
  };
};
