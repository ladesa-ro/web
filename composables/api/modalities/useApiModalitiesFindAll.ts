import { useQuery } from "@tanstack/vue-query";
import { ModalidadesService } from "../../../infrastructure/api/generated";

export const useApiModalitiesFindAll = async (searchTerm: MaybeRef<string>) => {
  const query = useQuery({
    queryKey: ["modalidade", searchTerm],

    queryFn: async () => {
      return ModalidadesService.modalidadeControllerModalidadeFindAll(undefined, undefined, unref(searchTerm));
    },
  });

  const modalidade = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    modalidade,
  };
};
