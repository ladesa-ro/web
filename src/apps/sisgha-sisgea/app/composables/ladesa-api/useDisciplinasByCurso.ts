import type { CursoPeriodoDisciplinaOutputItemDto } from '@ladesa-ro/web.api.client';

export type IDisciplinaDoCurso = CursoPeriodoDisciplinaOutputItemDto & {
  numeroPeriodo: number;
};

export const useDisciplinasByCurso = (cursoId: MaybeRef<string | null>) => {
  const cursos = useCursos();
  const query = cursos.findOne(cursoId);

  const disciplinas = computed<IDisciplinaDoCurso[]>(() => {
    const curso = query.data.value;
    if (!curso?.periodos) return [];

    return curso.periodos.flatMap(periodo =>
      periodo.disciplinas.map(d => ({
        ...d,
        numeroPeriodo: periodo.numeroPeriodo,
      }))
    );
  });

  return {
    disciplinas,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    query,
  };
};
