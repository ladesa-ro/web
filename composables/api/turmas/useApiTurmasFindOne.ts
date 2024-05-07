import { useQuery } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

export const useApiTurmasFindOne = async (
	idRef: MaybeRef<string | null | undefined>
) => {
	const apiClient = useApiClient();

	const query = useQuery({
		queryKey: ['turmas', computed(() => `turma::id::${unref(idRef)}`)],

		queryFn: async () => {
			const id = unref(idRef);
			if (id) {
				return apiClient.turmas.turmaFindOneById({
					id: id,
				});
			} else {
				return null;
			}
		},
	});

	const turma = computed(() => unref(query.data) ?? null);

	await query.suspense();

	return {
		query,
		turma,
	};
};
