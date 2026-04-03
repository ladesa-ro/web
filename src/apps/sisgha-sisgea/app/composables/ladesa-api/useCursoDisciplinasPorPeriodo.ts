import {
  cursoDisciplinasPorPeriodoFindAll,
  cursoDisciplinasPorPeriodoBulkReplace,
} from '@ladesa-ro/web.api.client';
import type {
  CursoPeriodoDisciplinaBulkReplaceInputDto,
} from '@ladesa-ro/web.api.client';

export const useCursoDisciplinasPorPeriodo = () => {
  const api = useApiClient();

  const findAll = (cursoId: string) =>
    api.call(cursoDisciplinasPorPeriodoFindAll, {
      path: { cursoId },
    });

  const bulkReplace = (
    cursoId: string,
    data: CursoPeriodoDisciplinaBulkReplaceInputDto,
  ) =>
    api.call(cursoDisciplinasPorPeriodoBulkReplace, {
      path: { cursoId },
      body: data,
    });

  return { findAll, bulkReplace };
};
