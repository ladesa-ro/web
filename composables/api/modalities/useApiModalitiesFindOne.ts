import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiModalitiesFindOne = async (
	idRef: MaybeRef<string | null | undefined>
) => {
	const apiClient = useApiClient();

	const query = useQuery({
		queryKey: ['modalidades', computed(() => `modalidade::id::${unref(idRef)}`)],

		queryFn: async () => {
			const id = unref(idRef);
			if (id) {
				return apiClient.modalidades.modalidadeFindOneById({
					id: id,
				});
			} else {
				return null;
			}
		},
	});

	const modalidade = computed(() => unref(query.data) ?? null);

	return { query, modalidade };
};
