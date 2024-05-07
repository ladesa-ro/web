import { useQuery } from "@tanstack/vue-query";
import { AmbientesService } from "../../../infrastructure/api/generated";

export const useApiAmbienteFindOne = async (idRef: MaybeRef<string | undefined | null>) => {
  const key = computed(() => `ambiente::${unref(idRef) ?? "-1"}`);
  const isIdValid = computed(() => typeof unref(idRef) === "string");


  const query = useQuery({
    queryKey: ["ambientes", key],

    queryFn: async () => {
      const id = unref(idRef);

      if (id) {
        return AmbientesService.ambienteControllerAmbienteFindById(id);
      }

      return null;
    },
  });

  const ambiente = computed(() => unref(query.data) ?? null);

  await query.suspense();

  return {
    query,
    ambiente,
  };
}

