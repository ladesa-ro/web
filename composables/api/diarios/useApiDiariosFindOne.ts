import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiDiariosFindOne = async (
	idRef: MaybeRef<string | null | undefined>
) => {
	const apiClient = useApiClient();

	const query = useQuery({
		queryKey: ['diarios', computed(() => `diario::id::${unref(idRef)}`)],

		queryFn: async () => {
			const id = unref(idRef);
			if (id) {
				return apiClient.diarios.diarioFindOneById({
					id: id,
				});
			} else {
				return null;
			}
		},
	});

	const diarios = computed(() => unref(query.data) ?? null);

	await query.suspense();

	return {
		query,
		diarios,
	};
};
