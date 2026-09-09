import type { InfiniteData } from '@tanstack/vue-query';
import type { DisciplinaFindAllResponse } from '@ladesa-ro/web.api.client';
import type {
  PeriodoDisciplinaLocal,
  PeriodoLocal,
} from './useCursoPeriodosSync';
import { FormMode } from '~/utils/constants';

type DisciplinaResumo = {
  nome: string;
  cargaHoraria: number;
};

type PeriodoVisivel = {
  numeroPeriodo: number;
  disciplinas: PeriodoDisciplinaLocal[];
  removedDisciplinaIds: string[];
};

export function useCursoPeriodosSelection(
  mode: MaybeRef<FormMode>,
  localPeriodos: Ref<PeriodoLocal[]>,
  savedPeriodos: Ref<Map<number, Set<string>>>
) {
  const disciplinas = useDisciplinas();

  type CursoModal = 'selectDisciplinas';
  const modals = useModalManager<CursoModal>({ history: true });

  const isEditing = computed(() => modals.isActive('selectDisciplinas'));

  const disciplinasInfiniteQuery = disciplinas.listInfinite(
    computed(() => ({ limit: 50 }))
  );
  const disciplinasData = computed(
    () =>
      disciplinasInfiniteQuery.data.value as
        | InfiniteData<DisciplinaFindAllResponse>
        | undefined
  );
  const disciplinasList = computed(
    () => disciplinasData.value?.pages.flatMap(page => page.data ?? []) ?? []
  );
  const disciplinasById = computed(() => {
    const map = new Map<string, DisciplinaResumo>();
    for (const disciplina of disciplinasList.value) {
      map.set(disciplina.id, {
        nome: disciplina.nome,
        cargaHoraria: disciplina.cargaHoraria,
      });
    }
    return map;
  });

  const selectedNumeroPeriodo = ref<number | null>(null);

  const selectedDisciplinaIds = computed(() => {
    const periodo = localPeriodos.value.find(
      item => item.numeroPeriodo === selectedNumeroPeriodo.value
    );
    if (!periodo) return new Set<string>();
    return new Set<string>(periodo.disciplinas.map(d => d.disciplinaId));
  });

  const periodosVisiveis = computed<PeriodoVisivel[]>(() => {
    const saved = savedPeriodos.value;

    return localPeriodos.value.map(periodo => {
      const currentIds = new Set(periodo.disciplinas.map(d => d.disciplinaId));
      const savedIds = saved.get(periodo.numeroPeriodo) ?? new Set<string>();

      return {
        numeroPeriodo: periodo.numeroPeriodo,
        disciplinas: periodo.disciplinas,
        removedDisciplinaIds: [...savedIds].filter(id => !currentIds.has(id)),
      };
    });
  });

  function openSelectDisciplinas(numeroPeriodo: number) {
    selectedNumeroPeriodo.value = numeroPeriodo;
    modals.open('selectDisciplinas');
  }

  function confirmDisciplinas(ids: Set<string>) {
    const numeroPeriodo = selectedNumeroPeriodo.value;

    localPeriodos.value = localPeriodos.value.map(periodo => {
      if (periodo.numeroPeriodo !== numeroPeriodo) return periodo;

      return {
        numeroPeriodo: periodo.numeroPeriodo,
        disciplinas: [...ids].map(id => ({
          disciplinaId: id,
          cargaHoraria: periodo.disciplinas.find(d => d.disciplinaId === id)
            ?.cargaHoraria,
        })),
      };
    });

    modals.close('selectDisciplinas');
  }

  function closeSelectDisciplinas() {
    modals.close('selectDisciplinas');
  }

  function isDisciplinaNova(numeroPeriodo: number, disciplinaId: string) {
    if (isCreateMode.value) return true;
    const saved = savedPeriodos.value.get(numeroPeriodo) ?? new Set<string>();
    return !saved.has(disciplinaId);
  }

  const isCreateMode = computed(() => unref(mode) === FormMode.CREATE);

  return {
    isEditing,
    isCreateMode,
    selectedNumeroPeriodo: readonly(selectedNumeroPeriodo),

    disciplinasInfiniteQuery,
    disciplinasList,
    disciplinasById,

    modals,
    periodosVisiveis,
    selectedDisciplinaIds,

    isDisciplinaNova,
    openSelectDisciplinas,
    confirmDisciplinas,
    closeSelectDisciplinas,
  };
}
