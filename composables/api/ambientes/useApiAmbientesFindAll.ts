import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';
import { AmbientesService } from '../../../infrastructure/api/generated';

export const useApiAmbientesFindAll = async (
	searchTerm: MaybeRef<string | undefined>
) => {
	const query = useQuery({
		queryKey: ['ambientes', searchTerm],

		queryFn: async () => {
			return AmbientesService.ambienteControllerAmbienteFindAll(
				undefined,
				undefined,
				unref(searchTerm),
				undefined,
				undefined,
				'nome:ASC'
			);
		},
	});

	const ambientes = computed(() => unref(query.data)?.data ?? []);
	const ambientesDebounced = refDebounced(ambientes, 200);

	await query.suspense();

	return {
		query,
		ambientes,
		ambientesDebounced,
	};
};
