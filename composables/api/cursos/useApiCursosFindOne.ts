import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiCursosFindOne = async (
	idRef: MaybeRef<string | null | undefined>
) => {
	const apiClient = useApiClient();

	const isIdValid = computed(() => typeof unref(idRef) === 'string');

	const query = useQuery({
		queryKey: ['cursos', computed(() => `curso::id::${unref(idRef)}`)],

		queryFn: async () => {
			const id = unref(idRef);
			if (id) {
				return apiClient.cursos.cursoFindOneById({
					id: id,
				});
			} else {
				return null;
			}
		},

		enabled: isIdValid,
	});

	const curso = computed(() => unref(query.data) ?? null);

	return { query, curso };
};
