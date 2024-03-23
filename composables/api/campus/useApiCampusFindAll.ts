import { useQuery } from "@tanstack/vue-query";
import { CampiService } from "../../../infrastructure/api/generated";

export const useApiCampusFindAll = async (searchTerm: MaybeRef<string>) => {
  const query = useQuery({
    queryKey: ["campi", searchTerm],

    queryFn: async () => {
      return CampiService.campusControllerCampusFindAll(undefined, undefined, unref(searchTerm));
    },
  });

  const campi = computed(() => unref(query.data)?.data ?? []);

  await query.suspense();

  return {
    query,
    campi,
  };
};
