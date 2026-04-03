import { useQuery } from '@tanstack/vue-query';
import {
  cursoDisciplinasPorPeriodoFindAll,
  cursoDisciplinasPorPeriodoBulkReplace,
} from '@ladesa-ro/web.api.client';
import type {
  CursoPeriodoDisciplinaBulkReplaceInputDto,
  CursoPeriodoDisciplinaListOutputDto,
} from '@ladesa-ro/web.api.client';
import { createInvalidate } from '~/composables/query-helpers';

export const useCursoDisciplinasPorPeriodo = () => {
  const api = useApiClient();

  const keys = ['curso-disciplinas-por-periodo'] as const;

  const findAllQuery = (cursoId: MaybeRef<string | null>) =>
    useQuery<CursoPeriodoDisciplinaListOutputDto | null>({
      queryKey: computed(() => [...keys, unref(cursoId)]),
      queryFn: () => {
        const id = unref(cursoId);
        if (!id) return null;
        return api.call(cursoDisciplinasPorPeriodoFindAll, {
          path: { cursoId: id },
        });
      },
      enabled: computed(() => !!unref(cursoId)),
      retry: 2,
    });

  const bulkReplace = (
    cursoId: string,
    data: CursoPeriodoDisciplinaBulkReplaceInputDto,
  ) =>
    api.call(cursoDisciplinasPorPeriodoBulkReplace, {
      path: { cursoId },
      body: data,
    });

  const invalidate = createInvalidate(keys);

  return { keys, findAllQuery, bulkReplace, invalidate };
};
