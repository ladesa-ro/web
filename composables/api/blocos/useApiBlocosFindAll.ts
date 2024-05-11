import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';

export const useApiBlocosFindAll = async (
	searchTerm: MaybeRef<string | undefined>
) => {
	const apiClient = useApiClient();

	const query = useQuery({
		queryKey: ['blocos', searchTerm],

		queryFn: async () => {
			return apiClient.blocos.blocoFindAll({
				search: unref(searchTerm),
			});
		},
	});

	const blocos = computed(() => unref(query.data)?.data ?? []);
	await query.suspense();
	const blocosDebounced = refDebounced(blocos, 200);

	return {
		query,
		blocos,
		blocosDebounced,
	};
};
