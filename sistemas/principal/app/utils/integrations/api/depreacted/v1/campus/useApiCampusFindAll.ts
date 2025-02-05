import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';

// campi => plural, mais de 1
// campus => singular, apenas 1

export const useApiCampusFindAll = async (searchTerm: MaybeRef<string>) => {
  const apiClient = useApiClient();
  const query = useQuery({
    queryKey: ['campi', searchTerm],

    queryFn: async () => {
      return apiClient.campi.campusList({
        search: unref(searchTerm),
      });
    },
  });

  const campi = computed(() => unref(query.data)?.data ?? []);

  const campiDebounced = refDebounced(campi, 200);

  await query.suspense();

  return {
    query,
    campi,
    campiDebounced,
  };
};
