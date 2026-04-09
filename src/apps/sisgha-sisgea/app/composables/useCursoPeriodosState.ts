import type {
  CursoFindByIdResponse,
} from '@ladesa-ro/web.api.client';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import { FormMode } from '~/utils/constants';
import { useCursoPeriodosSync } from './useCursoPeriodosSync';
import { useCursoPeriodosSelection } from './useCursoPeriodosSelection';

export type { PeriodoDisciplinaLocal, PeriodoLocal } from './useCursoPeriodosSync';

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
// Core state (orchestrator)
// ============================================================

function useCursoPeriodosState(
  mode: MaybeRef<FormMode>,
  quantidadePeriodos: MaybeRef<number>,
  cursoQuery: UseQueryReturnType<CursoFindByIdResponse | null, Error>,
) {
  const sync = useCursoPeriodosSync(quantidadePeriodos, cursoQuery);
  const selection = useCursoPeriodosSelection(mode, sync.localPeriodos, sync.savedPeriodos);

  return {
    // Sync state
    localPeriodos: readonly(sync.localPeriodos),
    savedPeriodos: readonly(sync.savedPeriodos),

    // Selection state
    isEditing: selection.isEditing,
    isCreateMode: selection.isCreateMode,
    selectedNumeroPeriodo: selection.selectedNumeroPeriodo,

    // Queries
    disciplinasInfiniteQuery: selection.disciplinasInfiniteQuery,
    disciplinasList: selection.disciplinasList,
    disciplinasById: selection.disciplinasById,

    // Modal
    modals: selection.modals,
    periodosVisiveis: selection.periodosVisiveis,
    selectedDisciplinaIds: selection.selectedDisciplinaIds,

    // Ações
    isDisciplinaNova: selection.isDisciplinaNova,
    openSelectDisciplinas: selection.openSelectDisciplinas,
    confirmDisciplinas: selection.confirmDisciplinas,
    closeSelectDisciplinas: selection.closeSelectDisciplinas,
    toPeriodosPayload: sync.toPeriodosPayload,
  };
}
