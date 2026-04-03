import type {
  CursoFindByIdResponse,
  DisciplinaFindAllResponse,
} from '@ladesa-ro/web.api.client';
import type { InfiniteData, UseQueryReturnType } from '@tanstack/vue-query';
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

type DisciplinaResumo = {
  nome: string;
  cargaHoraria: number;
};

type PeriodoVisivel = {
  numeroPeriodo: number;
  disciplinas: PeriodoDisciplinaLocal[];
  removedDisciplinaIds: string[];
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

  const isEditing = computed(() => modals.isActive('selectDisciplinas'));

  // ---- Disciplinas query (compartilhada) ----
  const disciplinasInfiniteQuery = disciplinas.listInfinite(
    computed(() => ({ limit: 50 })),
  );
  const disciplinasData = computed(
    () =>
      disciplinasInfiniteQuery.data.value as
        | InfiniteData<DisciplinaFindAllResponse>
        | undefined,
  );
  const disciplinasList = computed(() =>
    disciplinasData.value?.pages.flatMap(page => page.data ?? []) ?? [],
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

  // ---- Estado local de períodos ----
  const localPeriodos = ref<PeriodoLocal[]>([]);
  const savedPeriodos = ref(new Map<number, Set<string>>());
  const selectedNumeroPeriodo = ref<number | null>(null);
  const loadingFromServer = ref(false);

  function normalizePeriodos(
    count: number,
    source: PeriodoLocal[],
  ): PeriodoLocal[] {
    return Array.from({ length: count }, (_, i) => {
      const numeroPeriodo = i + 1;
      const existing = source.find(p => p.numeroPeriodo === numeroPeriodo);
      return {
        numeroPeriodo,
        disciplinas: existing?.disciplinas ?? [],
      };
    });
  }

  // ---- Sincronizar dados do servidor (via cursoQuery.data.periodos) ----
  watch(
    () => cursoQuery.data.value,
    serverData => {
      if (!serverData?.periodos) return;

      loadingFromServer.value = true;
      const count = Math.max(unref(quantidadePeriodos) ?? 0, 1);

      const periodosData: PeriodoLocal[] = serverData.periodos.map(p => ({
        numeroPeriodo: p.numeroPeriodo,
        disciplinas: p.disciplinas.map(d => ({
          disciplinaId: d.disciplinaId,
          cargaHoraria: d.cargaHoraria ?? undefined,
        })),
      }));

      localPeriodos.value = normalizePeriodos(count, periodosData);

      const snapshot = new Map<number, Set<string>>();
      for (const p of periodosData) {
        snapshot.set(
          p.numeroPeriodo,
          new Set(p.disciplinas.map((d: PeriodoDisciplinaLocal) => d.disciplinaId)),
        );
      }
      savedPeriodos.value = snapshot;

      nextTick(() => {
        loadingFromServer.value = false;
      });
    },
    { immediate: true },
  );

  // ---- Ajustar array local quando quantidadePeriodos muda ----
  watch(
    () => unref(quantidadePeriodos),
    count => {
      if (!count || count < 1 || loadingFromServer.value) return;

      localPeriodos.value = normalizePeriodos(count, localPeriodos.value);
    },
    { immediate: true },
  );

  // ---- IDs das disciplinas do período sendo editado ----
  const selectedDisciplinaIds = computed(() => {
    const periodo = localPeriodos.value.find(
      item => item.numeroPeriodo === selectedNumeroPeriodo.value,
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

  // ---- Ações ----

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

  function isDisciplinaNova(numeroPeriodo: number, disciplinaId: string) {
    if (isCreateMode.value) return true;
    const saved = savedPeriodos.value.get(numeroPeriodo) ?? new Set<string>();
    return !saved.has(disciplinaId);
  }

  const isCreateMode = computed(() => unref(mode) === FormMode.CREATE);

  return {
    // Estado
    localPeriodos: readonly(localPeriodos),
    savedPeriodos: readonly(savedPeriodos),
    isEditing,
    isCreateMode,
    selectedNumeroPeriodo: readonly(selectedNumeroPeriodo),

    // Queries
    disciplinasInfiniteQuery,
    disciplinasList,
    disciplinasById,

    // Modal
    modals,
    periodosVisiveis,
    selectedDisciplinaIds,

    // Ações
    isDisciplinaNova,
    openSelectDisciplinas,
    confirmDisciplinas,
    closeSelectDisciplinas,
    toPeriodosPayload,
  };
}
