import type { Dayjs } from 'dayjs';
import type { FormMode } from '~/utils/constants';
import { toDisplayFormat, toApiFormat } from '~/utils/horarios';
import { getWeekDays } from '~/utils/get-week-days';
import type {
  TurmaDisponibilidadeConfigInputDto,
  TurmaDisponibilidadeWeekOutputDto,
} from '@ladesa-ro/web.api.client';
import type { useTurmaGradeSelection } from './useTurmaGradeSelection';

interface SaveScope {
  dataInicio: string;
  dataFim: string | null;
}

export function useTurmaAvailabilityEdit(
  turmaId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  currentWeekRef: Ref<Dayjs>,
  grade: ReturnType<typeof useTurmaGradeSelection>,
) {
  const dayjs = useDayJs();
  const disponibilidade = useTurmaDisponibilidade();

  const { selectedGrade, selectedGradeIdentifier, allCampusTimes } = grade;

  // --- Week query ---

  const semanaParam = computed(() =>
    currentWeekRef.value.format('YYYY-MM-DD')
  );

  const weekQuery = disponibilidade.findByWeek(turmaId, semanaParam);

  // --- Edit State ---

  const isEditing = ref(false);
  const selectedDayWeek = ref<string>('');

  const editingAvailability = ref<Record<number, string[]>>({});
  const serverAvailability = ref<Record<number, string[]>>({});

  const selectedDayIndex = computed(() => {
    const days = getWeekDays(currentWeekRef.value);
    const match = days.find(d => d.dayWeek === selectedDayWeek.value);
    return match?.dayAsDayJs.day() ?? 1;
  });

  const selectedTimes = computed({
    get: () => editingAvailability.value[selectedDayIndex.value] ?? [],
    set: (val: string[]) => {
      editingAvailability.value[selectedDayIndex.value] = [...val];
    },
  });

  const isDirty = computed(() => {
    const editing = editingAvailability.value;
    const server = serverAvailability.value;
    const allDays = new Set([
      ...Object.keys(editing),
      ...Object.keys(server),
    ]);
    for (const day of allDays) {
      const eTimes = (editing[Number(day)] ?? []).slice().sort();
      const sTimes = (server[Number(day)] ?? []).slice().sort();
      if (eTimes.length !== sTimes.length) return true;
      for (let i = 0; i < eTimes.length; i++) {
        if (eTimes[i] !== sTimes[i]) return true;
      }
    }
    return false;
  });

  // --- Auto-select day ---

  watch(
    () => getWeekDays(currentWeekRef.value),
    days => {
      if (days.length > 0 && !selectedDayWeek.value) {
        selectedDayWeek.value = days[0]!.dayWeek;
      }
    },
    { immediate: true }
  );

  // --- Pending Save ---

  const pendingConfigs = ref<Map<string, TurmaDisponibilidadeConfigInputDto>>(new Map());
  const pendingDeactivations = ref<Set<string>>(new Set());

  const hasPendingSave = computed(() => pendingConfigs.value.size > 0 || pendingDeactivations.value.size > 0);

  function addPendingDeactivation(configId: string) {
    const newSet = new Set(pendingDeactivations.value);
    newSet.add(configId);
    pendingDeactivations.value = newSet;
  }

  function undoPendingDeactivation(configId: string) {
    const newSet = new Set(pendingDeactivations.value);
    newSet.delete(configId);
    pendingDeactivations.value = newSet;
  }

  function findPendingForWeek(weekSunday: string): TurmaDisponibilidadeConfigInputDto | undefined {
    const exact = pendingConfigs.value.get(weekSunday);
    if (exact) return exact;

    const saturday = dayjs(weekSunday).add(6, 'day').format('YYYY-MM-DD');

    let best: TurmaDisponibilidadeConfigInputDto | undefined;
    for (const config of pendingConfigs.value.values()) {
      const configCoversWeek =
        config.data_inicio <= saturday
        && (config.data_fim == null || config.data_fim >= weekSunday);

      if (configCoversWeek) {
        if (!best || config.data_inicio > best.data_inicio) {
          best = config;
        }
      }
    }
    return best;
  }

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

  function mapPendingToAvailability(
    pending: TurmaDisponibilidadeConfigInputDto
  ): Record<number, string[]> {
    const mapped: Record<number, string[]> = {};
    for (const dia of pending.horarios) {
      mapped[dia.dia_semana] = dia.intervalos.map(i =>
        toDisplayFormat(i.inicio)
      );
    }
    return mapped;
  }

  function applyAvailability(mapped: Record<number, string[]>) {
    serverAvailability.value = JSON.parse(JSON.stringify(mapped));
    if (!isEditing.value) {
      editingAvailability.value = JSON.parse(JSON.stringify(mapped));
    }
  }

  watch(
    () => weekQuery.data.value,
    data => {
      const weekKey = currentWeekRef.value.format('YYYY-MM-DD');
      const pending = findPendingForWeek(weekKey);

      if (pending) {
        applyAvailability(mapPendingToAvailability(pending));
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
      const pending = findPendingForWeek(weekKey);
      if (pending) {
        applyAvailability(mapPendingToAvailability(pending));
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

  // --- Build / Confirm / Save ---

  function buildConfig(scope: SaveScope): TurmaDisponibilidadeConfigInputDto {
    const gradeObj = selectedGrade.value;
    const gradeIntervalos = gradeObj?.intervalos ?? [];

    const horarios = Object.entries(editingAvailability.value)
      .filter(([, times]) => times.length > 0)
      .map(([diaSemana, times]) => {
        const intervalos = times.map(displayTime => {
          const match = gradeIntervalos.find(
            (item: { inicio: string; fim: string }) => toDisplayFormat(item.inicio) === displayTime
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
    const newMap = new Map(pendingConfigs.value);
    newMap.set(config.data_inicio, config);
    pendingConfigs.value = newMap;

    const mapped: Record<number, string[]> = {};
    for (const [day, times] of Object.entries(editingAvailability.value)) {
      if (times.length > 0) {
        mapped[Number(day)] = [...times];
      }
    }
    serverAvailability.value = JSON.parse(JSON.stringify(mapped));
    editingAvailability.value = JSON.parse(JSON.stringify(mapped));

    isEditing.value = false;
  }

  function undoPendingConfig(dataInicio: string) {
    const newMap = new Map(pendingConfigs.value);
    newMap.delete(dataInicio);
    pendingConfigs.value = newMap;
  }

  async function saveAvailability(overrideTurmaId?: string) {
    const id = overrideTurmaId ?? unref(turmaId);
    if (!id) return;

    const hasConfigs = pendingConfigs.value.size > 0;
    const hasDeactivations = pendingDeactivations.value.size > 0;
    if (!hasConfigs && !hasDeactivations) return;

    if (hasDeactivations) {
      for (const configId of pendingDeactivations.value) {
        await disponibilidade.deactivate(id, configId);
      }
    }

    if (hasConfigs) {
      const configs = [...pendingConfigs.value.values()];
      await disponibilidade.save(id, { configs });
    }

    await disponibilidade.invalidate();
    pendingConfigs.value = new Map();
    pendingDeactivations.value = new Set();
  }

  // --- Actions ---

  function selectAllTimes() {
    const times = allCampusTimes.value;
    const all: Record<number, string[]> = {};
    for (let day = 1; day <= 6; day++) {
      all[day] = [...times];
    }
    editingAvailability.value = all;
  }

  function enterEditMode() {
    const hasServerData = Object.keys(serverAvailability.value).length > 0;
    if (hasGradeDivergence.value || !hasServerData) {
      selectAllTimes();
    } else {
      editingAvailability.value = JSON.parse(
        JSON.stringify(serverAvailability.value)
      );
    }
    isEditing.value = true;
  }

  function cancelEdit() {
    editingAvailability.value = JSON.parse(
      JSON.stringify(serverAvailability.value)
    );
    isEditing.value = false;
  }

  return {
    weekQuery,
    isEditing,
    selectedDayWeek,
    selectedTimes,
    isDirty,
    enterEditMode,
    cancelEdit,
    confirmAvailability,
    selectAllTimes,
    pendingConfigs,
    undoPendingConfig,
    saveAvailability,
    hasPendingSave,
    invalidateDisponibilidade: disponibilidade.invalidate,
    allConfigsQuery: disponibilidade.findAllActive(turmaId),
    pendingDeactivations,
    addPendingDeactivation,
    undoPendingDeactivation,
    activeConfigInfo,
    currentWeekPending,
    hasGradeDivergence,
  };
}
