import { useQuery } from "@tanstack/vue-query";

import { refDebounced } from '@vueuse/core';

export const useApiModalitiesFindAll = async (searchTerm: MaybeRef<string>) => {
  const apiClient = useApiClient();
  const query = useQuery({
    queryKey: ["modalidade", searchTerm],

    queryFn: async () => {
      return apiClient.modalidades.modalidadeFindAll({
          search: unref(searchTerm)
        })
    },
  });

  const modalidade = computed(() => unref(query.data)?.data ?? []);

  const modalidadeDebounced = refDebounced(modalidade, 200);

  await query.suspense();

  return {
    query,
    modalidade,
    modalidadeDebounced,
  };
};
