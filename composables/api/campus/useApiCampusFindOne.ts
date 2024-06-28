import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiCampusFindOne = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['campi', computed(() => `campus::id::${unref(idRef)}`)],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.campi.campusFindById({
          id: id,
        });
      } else {
        return null;
      }
    },
  });

  const campus = computed(() => unref(query.data) ?? null);

  return { query, campus };
};
