import type { CursoFindByIdResponse } from '@ladesa-ro/web.api.client';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import { FormMode } from '~/utils/constants';

// ============================================================
// Tipos
// ============================================================

export type PeriodoDisciplinaLocal = {
  disciplinaId: string;
  cargaHoraria?: number;
};

export type PeriodoLocal = {
  numeroPeriodo: number;
  disciplinas: PeriodoDisciplinaLocal[];
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
  mode: MaybeRef<FormMode>,
  quantidadePeriodos: MaybeRef<number>,
  cursoQuery: UseQueryReturnType<CursoFindByIdResponse | null, Error>,
) {
  const state = useCursoPeriodosState(mode, quantidadePeriodos, cursoQuery);
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
  mode: MaybeRef<FormMode>,
  quantidadePeriodos: MaybeRef<number>,
  cursoQuery: UseQueryReturnType<CursoFindByIdResponse | null, Error>,
) {
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

  // ---- Estado local de períodos ----
  const localPeriodos = ref<PeriodoLocal[]>([]);
  const savedPeriodos = ref(new Map<number, Set<string>>());

  // Flag para evitar race condition entre watchers
  let loadingFromServer = false;

  // ---- Sincronizar dados do servidor (via cursoQuery.data.periodos) ----
  watch(
    () => cursoQuery.data.value,
    serverData => {
      if (!serverData?.periodos) return;

      loadingFromServer = true;

      const periodosData: PeriodoLocal[] = serverData.periodos.map(p => ({
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
          new Set(p.disciplinas.map((d: PeriodoDisciplinaLocal) => d.disciplinaId)),
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

  // ---- Converter para payload de envio ----

  function toPeriodosPayload() {
    return localPeriodos.value.map(p => ({
      numeroPeriodo: p.numeroPeriodo,
      disciplinas: p.disciplinas.map(d => ({
        disciplinaId: d.disciplinaId,
        ...(d.cargaHoraria != null ? { cargaHoraria: d.cargaHoraria } : {}),
      })),
    }));
  }

  const isCreateMode = computed(() => unref(mode) === FormMode.CREATE);

  return {
    // Estado
    localPeriodos: readonly(localPeriodos),
    savedPeriodos: readonly(savedPeriodos),
    editingPeriodoIndex: readonly(editingPeriodoIndex),
    isEditing,
    isCreateMode,

    // Queries
    disciplinasInfiniteQuery,

    // Modal
    modals,
    currentDisciplinaIds,

    // Ações
    openSelectDisciplinas,
    confirmDisciplinas,
    closeSelectDisciplinas,
    toPeriodosPayload,
  };
}
