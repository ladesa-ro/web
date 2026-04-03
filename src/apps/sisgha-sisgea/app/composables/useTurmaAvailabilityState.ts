import type { Dayjs } from 'dayjs';
import type { FormMode } from '~/utils/constants';
import { useTurmaGradeSelection } from './turma-availability/useTurmaGradeSelection';
import { useTurmaWeekNavigation } from './turma-availability/useTurmaWeekNavigation';
import { useTurmaAvailabilityEdit } from './turma-availability/useTurmaAvailabilityEdit';

export type TurmaAvailabilityState = ReturnType<typeof useTurmaAvailabilityState>;

const TURMA_AVAILABILITY_KEY = Symbol('turma-availability') as InjectionKey<TurmaAvailabilityState>;

export function useProvideTurmaAvailability(
  turmaId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  campusIdExternal?: MaybeRef<string | null>
) {
  const state = useTurmaAvailabilityState(turmaId, mode, campusIdExternal);
  provide(TURMA_AVAILABILITY_KEY, state);
  return state;
}

export function useInjectTurmaAvailability() {
  const state = inject(TURMA_AVAILABILITY_KEY);

  if (!state) {
    throw new Error('useInjectTurmaAvailability: must be used inside a component that calls useProvideTurmaAvailability');
  }

  return state;
}

export function useTurmaAvailabilityState(
  turmaId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  campusIdExternal?: MaybeRef<string | null>
) {
  const dayjs = useDayJs();

  const campusId = computed(() => unref(campusIdExternal) ?? null);
  const currentWeekRef = ref<Dayjs>(dayjs().startOf('week'));

  const grade = useTurmaGradeSelection(campusId);

  const edit = useTurmaAvailabilityEdit(
    turmaId,
    mode,
    currentWeekRef,
    grade,
  );

  const week = useTurmaWeekNavigation(
    turmaId,
    currentWeekRef,
    edit.isDirty,
    edit.isEditing,
    { onConfirmSave: edit.confirmAvailability },
  );

  // Auto-select all times when grade changes during edit
  watch(grade.campusShifts, () => {
    if (edit.isEditing.value) {
      edit.selectAllTimes();
    }
  });

  return {
    // Week
    currentWeekRef,
    weekDays: week.weekDays,
    weekLabel: week.weekLabel,
    isPastWeek: week.isPastWeek,
    goToPrevWeek: week.goToPrevWeek,
    goToNextWeek: week.goToNextWeek,

    // Campus Grades
    campusGrades: grade.campusGrades,
    selectedGradeIdentifier: grade.selectedGradeIdentifier,
    selectedGrade: grade.selectedGrade,
    campusShifts: grade.campusShifts,
    campusScheduleLoading: grade.campusScheduleLoading,

    // Disponibilidade
    weekQuery: edit.weekQuery,

    // Edit
    isEditing: edit.isEditing,
    selectedDayWeek: edit.selectedDayWeek,
    selectedTimes: edit.selectedTimes,
    isDirty: edit.isDirty,
    enterEditMode: edit.enterEditMode,
    cancelEdit: edit.cancelEdit,
    confirmAvailability: edit.confirmAvailability,

    // Save (deferred to form submit)
    pendingConfigs: edit.pendingConfigs,
    undoPendingConfig: edit.undoPendingConfig,
    saveAvailability: edit.saveAvailability,
    hasPendingSave: edit.hasPendingSave,
    invalidateDisponibilidade: edit.invalidateDisponibilidade,

    // All configs
    allConfigsQuery: edit.allConfigsQuery,
    pendingDeactivations: edit.pendingDeactivations,
    addPendingDeactivation: edit.addPendingDeactivation,
    undoPendingDeactivation: edit.undoPendingDeactivation,

    // Config info
    activeConfigInfo: edit.activeConfigInfo,
    currentWeekPending: edit.currentWeekPending,

    // Divergence
    hasGradeDivergence: edit.hasGradeDivergence,

    // Navigation confirmation
    setOnNavigationBlocked: week.setOnNavigationBlocked,
    pendingNavigation: week.pendingNavigation,
    confirmNavigationAndSave: week.confirmNavigationAndSave,
    confirmNavigationDiscard: week.confirmNavigationDiscard,
  };
}
