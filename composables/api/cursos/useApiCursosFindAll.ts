import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';

export const useApiCursosFindAll = async (searchTerm: MaybeRef<string>) => {
	const apiClient = useApiClient();

	const query = useQuery({
		queryKey: ['cursos', searchTerm],

		queryFn: async () => {
			return apiClient.cursos.cursoFindAll({
				search: unref(searchTerm),
			});
		},
	});

	const cursos = computed(() => unref(query.data)?.data ?? []);
	const cursosDebounced = refDebounced(cursos, 200);

	await query.suspense();

	return {
		query,
		cursos,
		cursosDebounced,
	};
};
