import type { UseQueryReturnType } from '@tanstack/vue-query';
import type {
  CursoPeriodoDisciplinaItemDto,
  CursoPeriodoDisciplinaPeriodoItemDto,
  DisciplinaFindAllResponse,
} from '@ladesa-ro/web.api.client';
import type { FormMode } from '~/utils/constants';

// ============================================================
// Tipos
// ============================================================

export type PeriodoLocal = {
  numeroPeriodo: number;
  disciplinas: CursoPeriodoDisciplinaItemDto[];
};

export type CursoPeriodosState = ReturnType<typeof useCursoPeriodosState>;

// ============================================================
// Injection key
// ============================================================

const CURSO_PERIODOS_KEY = Symbol('curso-periodos') as InjectionKey<CursoPeriodosState>;

// ============================================================
// Provider / Inject
// ============================================================

export function useProvideCursoPeriodos(
  cursoId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  quantidadePeriodos: MaybeRef<number>,
) {
  const state = useCursoPeriodosState(cursoId, mode, quantidadePeriodos);
  provide(CURSO_PERIODOS_KEY, state);
  return state;
}

export function useInjectCursoPeriodos() {
  const state = inject(CURSO_PERIODOS_KEY);

  if (!state) {
    throw new Error(
      'useInjectCursoPeriodos: must be used inside a component that calls useProvideCursoPeriodos',
    );
  }

  return state;
}

// ============================================================
// Core state
// ============================================================

function useCursoPeriodosState(
  cursoId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  quantidadePeriodos: MaybeRef<number>,
) {
  const cursoDisciplinasPorPeriodo = useCursoDisciplinasPorPeriodo();
  const disciplinas = useDisciplinas();

  // ---- Modal manager ----
  type CursoModal = 'selectDisciplinas';
  const modals = useModalManager<CursoModal>({ history: true });

  const editingPeriodoIndex = ref(0);
  const isEditing = computed(() => modals.isActive('selectDisciplinas'));

  // ---- Disciplinas query (compartilhada) ----
  const disciplinasInfiniteQuery = disciplinas.listInfinite(
    computed(() => ({ limit: 50 })),
  );

  // ---- Disciplinas por período (TanStack Query com retry) ----
  const periodosQuery = cursoDisciplinasPorPeriodo.findAllQuery(
    computed(() => unref(cursoId)),
  );

  // ---- Estado local de períodos ----
  const localPeriodos = ref<PeriodoLocal[]>([]);
  const savedPeriodos = ref(new Map<number, Set<string>>());

  // Flag para evitar race condition entre watchers
  let loadingFromServer = false;

  // ---- Sincronizar dados do servidor ----
  watch(
    () => periodosQuery.data.value,
    serverData => {
      if (!serverData?.data) return;

      loadingFromServer = true;

      const periodosData: PeriodoLocal[] = serverData.data.map(p => ({
        numeroPeriodo: p.numeroPeriodo,
        disciplinas: p.disciplinas.map(d => ({
          disciplinaId: d.disciplinaId,
          cargaHoraria: d.cargaHoraria ?? undefined,
        })),
      }));

      localPeriodos.value = periodosData;

      const snapshot = new Map<number, Set<string>>();
      for (const p of periodosData) {
        snapshot.set(
          p.numeroPeriodo,
          new Set(p.disciplinas.map(d => d.disciplinaId)),
        );
      }
      savedPeriodos.value = snapshot;

      nextTick(() => {
        loadingFromServer = false;
      });
    },
    { immediate: true },
  );

  // ---- Ajustar array local quando quantidadePeriodos muda ----
  watch(
    () => unref(quantidadePeriodos),
    count => {
      if (!count || count < 1 || loadingFromServer) return;

      const current = localPeriodos.value;
      localPeriodos.value = Array.from({ length: count }, (_, i) => ({
        numeroPeriodo: i + 1,
        disciplinas: current[i]?.disciplinas ?? [],
      }));
    },
    { immediate: true },
  );

  // ---- IDs das disciplinas do período sendo editado ----
  const currentDisciplinaIds = computed(() => {
    const periodo = localPeriodos.value[editingPeriodoIndex.value];
    if (!periodo) return new Set<string>();
    return new Set<string>(periodo.disciplinas.map(d => d.disciplinaId));
  });

  // ---- Ações ----

  function openSelectDisciplinas(periodoIndex: number) {
    editingPeriodoIndex.value = periodoIndex;
    modals.open('selectDisciplinas');
  }

  function confirmDisciplinas(ids: Set<string>) {
    const current = [...localPeriodos.value];
    const index = editingPeriodoIndex.value;
    const existing = current[index];

    if (existing) {
      current[index] = {
        numeroPeriodo: existing.numeroPeriodo,
        disciplinas: [...ids].map(id => ({
          disciplinaId: id,
          cargaHoraria: existing.disciplinas.find(d => d.disciplinaId === id)
            ?.cargaHoraria,
        })),
      };
      localPeriodos.value = current;
    }

    modals.close('selectDisciplinas');
  }

  function closeSelectDisciplinas() {
    modals.close('selectDisciplinas');
  }

  // ---- Salvar ----

  async function savePeriodos(overrideCursoId?: string) {
    const id = overrideCursoId ?? unref(cursoId);
    if (!id) return;

    const periodos: CursoPeriodoDisciplinaPeriodoItemDto[] =
      localPeriodos.value.map(p => ({
        numeroPeriodo: p.numeroPeriodo,
        disciplinas: p.disciplinas.map(d => ({
          disciplinaId: d.disciplinaId,
          ...(d.cargaHoraria != null ? { cargaHoraria: d.cargaHoraria } : {}),
        })),
      }));

    await cursoDisciplinasPorPeriodo.bulkReplace(id, { periodos });
  }

  async function invalidate() {
    await cursoDisciplinasPorPeriodo.invalidate();
  }

  return {
    // Estado
    localPeriodos: readonly(localPeriodos),
    savedPeriodos: readonly(savedPeriodos),
    editingPeriodoIndex: readonly(editingPeriodoIndex),
    isEditing,

    // Queries
    periodosQuery,
    disciplinasInfiniteQuery,

    // Modal
    modals,
    currentDisciplinaIds,

    // Ações
    openSelectDisciplinas,
    confirmDisciplinas,
    closeSelectDisciplinas,
    savePeriodos,
    invalidate,
  };
}
