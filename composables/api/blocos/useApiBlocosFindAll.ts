import { useQuery } from "@tanstack/vue-query";
import { BlocosService } from "../../../infrastructure/api/generated";

export const useApiBlocosFindAll = async (searchTerm: MaybeRef<string>) => {
  const query = useQuery({
    queryKey: ["blocos", searchTerm],

    queryFn: async () => {
      return BlocosService.blocoControllerBlocoFindAll(undefined, undefined, unref(searchTerm), "nome:ASC");
    },
  });

  const blocos = computed(() => unref(query.data)?.data ?? []);
  await query.suspense();


  return {
    query,
    blocos,
  };
};
