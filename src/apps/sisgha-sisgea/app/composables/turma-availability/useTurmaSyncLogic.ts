import type { Dayjs } from 'dayjs';
import type {
  TurmaDisponibilidadeWeekOutputDto,
} from '@ladesa-ro/web.api.client';
import { toDisplayFormat } from '~/utils/horarios';
import type { useTurmaGradeSelection } from './useTurmaGradeSelection';
import type { useTurmaEditState } from './useTurmaEditState';
import type { useTurmaPendingConfigs } from './useTurmaPendingConfigs';

export function useTurmaSyncLogic(
  turmaId: MaybeRef<string | null>,
  currentWeekRef: Ref<Dayjs>,
  grade: ReturnType<typeof useTurmaGradeSelection>,
  editState: ReturnType<typeof useTurmaEditState>,
  pending: ReturnType<typeof useTurmaPendingConfigs>,
) {
  const disponibilidade = useTurmaDisponibilidade();

  const { selectedGradeIdentifier, allCampusTimes } = grade;
  const { serverAvailability, isEditing, applyAvailability } = editState;
  const { findPendingForWeek, mapPendingToAvailability } = pending;

  // --- Week query ---

  const semanaParam = computed(() =>
    currentWeekRef.value.format('YYYY-MM-DD')
  );

  const weekQuery = disponibilidade.findByWeek(turmaId, semanaParam);

  // --- Sync server → local ---

  const mapConfigToAvailability = (
    data: TurmaDisponibilidadeWeekOutputDto | undefined
  ): Record<number, string[]> => {
    if (!data?.configs?.length) return {};
    const config = data.configs[0]!;
    const mapped: Record<number, string[]> = {};
    for (const dia of config.horarios) {
      mapped[dia.dia_semana] = dia.intervalos.map(i =>
        toDisplayFormat(i.inicio)
      );
    }
    return mapped;
  };

  function syncGradeFromConfig(data: TurmaDisponibilidadeWeekOutputDto | undefined) {
    if (!data?.configs?.length) return;
    const config = data.configs[0]!;
    const serverGradeId = config.identificador_externo_grade_horaria ?? null;
    if (serverGradeId) {
      selectedGradeIdentifier.value = serverGradeId;
    }
  }

  watch(
    () => weekQuery.data.value,
    data => {
      const weekKey = currentWeekRef.value.format('YYYY-MM-DD');
      const pendingConfig = findPendingForWeek(weekKey);

      if (pendingConfig) {
        applyAvailability(mapPendingToAvailability(pendingConfig));
      } else {
        syncGradeFromConfig(data);
        applyAvailability(mapConfigToAvailability(data));
      }
    },
    { immediate: true }
  );

  watch(
    semanaParam,
    weekKey => {
      const pendingConfig = findPendingForWeek(weekKey);
      if (pendingConfig) {
        applyAvailability(mapPendingToAvailability(pendingConfig));
      }
    }
  );

  // --- Pending config for current week ---

  const currentWeekPending = computed(() => {
    const weekKey = currentWeekRef.value.format('YYYY-MM-DD');
    return findPendingForWeek(weekKey) ?? null;
  });

  // --- Grade Divergence Detection ---

  const hasGradeDivergence = computed(() => {
    if (!selectedGradeIdentifier.value) return false;
    const data = weekQuery.data.value;
    if (!data?.configs?.length) return false;
    const config = data.configs[0]!;
    const serverGradeId = config.identificador_externo_grade_horaria ?? null;

    if (!serverGradeId) return true;
    if (serverGradeId !== selectedGradeIdentifier.value) return true;

    const currentTimes = new Set(allCampusTimes.value);
    if (currentTimes.size === 0) return false;
    for (const times of Object.values(serverAvailability.value)) {
      for (const t of times) {
        if (!currentTimes.has(t)) return true;
      }
    }
    return false;
  });

  // --- Active config info ---

  const activeConfigInfo = computed(() => {
    const data = weekQuery.data.value;
    if (!data?.configs?.length) return null;
    const config = data.configs[0]!;
    const dataFim = config.data_fim ?? null;
    return {
      dataInicio: config.data_inicio,
      dataFim,
      tipo: dataFim ? ('temporario' as const) : ('permanente' as const),
    };
  });

  return {
    weekQuery,
    semanaParam,
    currentWeekPending,
    hasGradeDivergence,
    activeConfigInfo,
    invalidateDisponibilidade: disponibilidade.invalidate,
    allConfigsQuery: disponibilidade.findAllActive(turmaId),
    disponibilidade,
  };
}
