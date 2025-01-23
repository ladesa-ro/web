import { useQuery } from '@tanstack/vue-query';

export const useApiAmbienteFindOne = async (
  idRef: MaybeRef<string | undefined | null>
) => {
  const key = computed(() => `ambiente::${unref(idRef) ?? '-1'}`);

  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['ambientes', key],

    queryFn: async () => {
      const id = unref(idRef);

      if (id) {
        return apiClient.ambientes.ambienteFindOneById({ id: id });
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
};
