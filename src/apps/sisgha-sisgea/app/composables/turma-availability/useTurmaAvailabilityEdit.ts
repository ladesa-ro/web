import type { Dayjs } from 'dayjs';
import type { FormMode } from '~/utils/constants';
import { toApiFormat, toDisplayFormat } from '~/utils/horarios';
import type { TurmaDisponibilidadeConfigInputDto } from '@ladesa-ro/web.api.client';
import type { useTurmaGradeSelection } from './useTurmaGradeSelection';
import { useTurmaEditState } from './useTurmaEditState';
import { useTurmaPendingConfigs } from './useTurmaPendingConfigs';
import { useTurmaSyncLogic } from './useTurmaSyncLogic';

interface SaveScope {
  dataInicio: string;
  dataFim: string | null;
}

export function useTurmaAvailabilityEdit(
  turmaId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  currentWeekRef: Ref<Dayjs>,
  grade: ReturnType<typeof useTurmaGradeSelection>
) {
  const { selectedGrade, selectedGradeIdentifier, allCampusTimes } = grade;

  const editState = useTurmaEditState(currentWeekRef);
  const pending = useTurmaPendingConfigs();
  const sync = useTurmaSyncLogic(
    turmaId,
    currentWeekRef,
    grade,
    editState,
    pending
  );

  // --- Build / Confirm / Save ---

  function buildConfig(scope: SaveScope): TurmaDisponibilidadeConfigInputDto {
    const gradeObj = selectedGrade.value;
    const gradeIntervalos = gradeObj?.intervalos ?? [];

    const horarios = Object.entries(editState.editingAvailability.value)
      .filter(([, times]) => times.length > 0)
      .map(([diaSemana, times]) => {
        const intervalos = times.map(displayTime => {
          const match = gradeIntervalos.find(
            (item: { inicio: string; fim: string }) =>
              toDisplayFormat(item.inicio) === displayTime
          );
          return {
            inicio: match ? match.inicio : toApiFormat(displayTime),
            fim: match ? match.fim : toApiFormat(displayTime),
          };
        });
        return {
          dia_semana: Number(diaSemana),
          intervalos,
        };
      });

    return {
      data_inicio: scope.dataInicio,
      data_fim: scope.dataFim,
      identificador_externo_grade_horaria: selectedGradeIdentifier.value,
      horarios,
    } as TurmaDisponibilidadeConfigInputDto;
  }

  function confirmAvailability(scope: SaveScope) {
    const config = buildConfig(scope);
    pending.addPendingConfig(config);

    const mapped: Record<number, string[]> = {};
    for (const [day, times] of Object.entries(
      editState.editingAvailability.value
    )) {
      if (times.length > 0) {
        mapped[Number(day)] = [...times];
      }
    }
    editState.serverAvailability.value = JSON.parse(JSON.stringify(mapped));
    editState.editingAvailability.value = JSON.parse(JSON.stringify(mapped));

    editState.isEditing.value = false;
  }

  async function saveAvailability(overrideTurmaId?: string) {
    const id = overrideTurmaId ?? unref(turmaId);
    if (!id) return;

    const hasConfigs = pending.pendingConfigs.value.size > 0;
    const hasDeactivations = pending.pendingDeactivations.value.size > 0;
    if (!hasConfigs && !hasDeactivations) return;

    if (hasDeactivations) {
      for (const configId of pending.pendingDeactivations.value) {
        await sync.disponibilidade.deactivate(id, configId);
      }
    }

    if (hasConfigs) {
      const configs = [...pending.pendingConfigs.value.values()];
      await sync.disponibilidade.save(id, { configs });
    }

    await sync.disponibilidade.invalidate();
    pending.clearAll();
  }

  // --- Actions ---

  function selectAllTimes() {
    const times = allCampusTimes.value;
    const all: Record<number, string[]> = {};
    for (let day = 1; day <= 6; day++) {
      all[day] = [...times];
    }
    editState.editingAvailability.value = all;
  }

  function enterEditMode() {
    editState.enterEditMode({
      hasGradeDivergence: sync.hasGradeDivergence.value,
      selectAllTimes,
    });
  }

  function cancelEdit() {
    editState.cancelEdit();
  }

  return {
    weekQuery: sync.weekQuery,
    isEditing: editState.isEditing,
    selectedDayWeek: editState.selectedDayWeek,
    selectedTimes: editState.selectedTimes,
    isDirty: editState.isDirty,
    enterEditMode,
    cancelEdit,
    confirmAvailability,
    selectAllTimes,
    pendingConfigs: pending.pendingConfigs,
    undoPendingConfig: pending.undoPendingConfig,
    saveAvailability,
    hasPendingSave: pending.hasPendingSave,
    invalidateDisponibilidade: sync.invalidateDisponibilidade,
    allConfigsQuery: sync.allConfigsQuery,
    pendingDeactivations: pending.pendingDeactivations,
    addPendingDeactivation: pending.addPendingDeactivation,
    undoPendingDeactivation: pending.undoPendingDeactivation,
    activeConfigInfo: sync.activeConfigInfo,
    currentWeekPending: sync.currentWeekPending,
    hasGradeDivergence: sync.hasGradeDivergence,
  };
}
