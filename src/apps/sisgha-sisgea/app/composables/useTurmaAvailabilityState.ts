import type { Dayjs } from 'dayjs';
import type { FormMode } from '~/utils/constants';
import { getWeekDays } from '~/utils/get-week-days';
import {
  agruparPorPeriodo,
  toDisplayFormat,
  toApiFormat,
} from '~/utils/horarios';
import type { DayShift } from '~/composables/useAvailability';
import type { IWeekDay } from '~/components/Section/Horario/-Helpers/IWeekDay';
import type {
  GradeHorariaItemOutputDto,
  TurmaDisponibilidadeConfigInputDto,
  TurmaDisponibilidadeWeekOutputDto,
} from '@ladesa-ro/web.api.client';

export function useTurmaAvailabilityState(
  turmaId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  campusIdExternal?: MaybeRef<string | null>
) {
  const dayjs = useDayJs();
  const gradesHorarias = useGradesHorarias();
  const disponibilidade = useTurmaDisponibilidade();

  // --- Campus ID ---

  const campusId = computed(() => unref(campusIdExternal) ?? null);

  // --- Week Navigation ---

  const currentWeekRef = ref<Dayjs>(dayjs().startOf('week'));

  const weekDays = computed<IWeekDay[]>(() => getWeekDays(currentWeekRef.value));

  const weekLabel = computed(() => {
    const days = weekDays.value;
    if (days.length === 0) return '';
    const first = days[0]!;
    const last = days[days.length - 1]!;
    return `${first.dayMonth} - ${last.dayMonth}`;
  });

  const isPastWeek = computed(() => {
    const thisWeekStart = dayjs().startOf('week');
    return currentWeekRef.value.isBefore(thisWeekStart, 'day');
  });

  // --- Campus Grades (multiple grades) ---

  const campusGradesQuery = gradesHorarias.findByCampus(campusId);

  const campusGrades = computed(() => campusGradesQuery.data.value?.data ?? []);

  // --- Selected Grade ---

  const selectedGradeIdentifier = ref<string | null>(null);

  // Auto-select first grade when grades load and nothing selected
  watch(
    campusGrades,
    (grades) => {
      if (grades.length > 0 && !selectedGradeIdentifier.value) {
        selectedGradeIdentifier.value = grades[0]!.identificadorExterno;
      }
    },
    { immediate: true },
  );

  const selectedGrade = computed((): GradeHorariaItemOutputDto | null =>
    campusGrades.value.find(
      (g: GradeHorariaItemOutputDto) => g.identificadorExterno === selectedGradeIdentifier.value,
    ) ?? null,
  );

  // --- Campus Shifts (derived from selected grade) ---

  const campusShifts = computed<DayShift[]>(() => {
    const grade = selectedGrade.value;
    if (!grade) return [];
    const intervalos = grade.intervalos.map((item: { inicio: string; fim: string }) => ({
      inicio: item.inicio,
      fim: item.fim,
    }));
    const grupos = agruparPorPeriodo(intervalos);
    return grupos
      .map(g => ({
        title: g.nome.toLowerCase(),
        times: g.intervalos.map(i => toDisplayFormat(i.inicio)),
      }))
      .filter(s => s.times.length > 0);
  });

  const allCampusTimes = computed(() =>
    campusShifts.value.flatMap(s => s.times)
  );

  function selectAllTimes() {
    const times = allCampusTimes.value;
    const all: Record<number, string[]> = {};
    for (let day = 1; day <= 6; day++) {
      all[day] = [...times];
    }
    editingAvailability.value = all;
  }

  // Auto-select all times when grade changes during edit
  watch(campusShifts, () => {
    if (isEditing.value) {
      selectAllTimes();
    }
  });

  // --- Turma Disponibilidade per Week ---

  const semanaParam = computed(() =>
    currentWeekRef.value.format('YYYY-MM-DD')
  );

  const weekQuery = disponibilidade.findByWeek(turmaId, semanaParam);

  // --- Edit State ---

  const isEditing = ref(false);
  const selectedDayWeek = ref<string>('');

  // dia_semana (1=seg..6=sab) → list of "HH:MM" display times
  const editingAvailability = ref<Record<number, string[]>>({});
  const serverAvailability = ref<Record<number, string[]>>({});

  // Derive the numeric day index (1=seg..6=sab) from selectedDayWeek label
  const selectedDayIndex = computed(() => {
    const match = weekDays.value.find(d => d.dayWeek === selectedDayWeek.value);
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

  // --- Pending Save (deferred to form submit) ---

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

  // --- Sync server data to local state ---

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

  // Sync selected grade from server config
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

  watch(
    weekDays,
    days => {
      if (days.length > 0 && !selectedDayWeek.value) {
        selectedDayWeek.value = days[0]!.dayWeek;
      }
    },
    { immediate: true }
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

    // No grade stored in config — legacy data
    if (!serverGradeId) return true;

    // Grade identifier changed
    if (serverGradeId !== selectedGradeIdentifier.value) return true;

    // Check if times in availability exist in current grade
    const currentTimes = new Set(allCampusTimes.value);
    if (currentTimes.size === 0) return false;
    for (const times of Object.values(serverAvailability.value)) {
      for (const t of times) {
        if (!currentTimes.has(t)) return true;
      }
    }
    return false;
  });

  // --- Active config info (for view mode) ---

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

  interface SaveScope {
    dataInicio: string;
    dataFim: string | null;
  }

  function buildConfig(scope: SaveScope): TurmaDisponibilidadeConfigInputDto {
    const grade = selectedGrade.value;
    const gradeIntervalos = grade?.intervalos ?? [];

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

  async function saveAvailability() {
    const id = unref(turmaId);
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

  // --- Prefetch AOT ---

  function prefetchAdjacentWeeks() {
    const id = unref(turmaId);
    if (!id) return;

    const offsets = [-1, 1, 2];
    for (const offset of offsets) {
      const week = currentWeekRef.value.add(offset, 'week');
      disponibilidade.prefetchWeek(id, week.format('YYYY-MM-DD'));
    }
  }

  watch(
    () => unref(turmaId),
    id => { if (id) prefetchAdjacentWeeks(); },
    { immediate: true }
  );

  // --- Week Navigation with dirty check ---

  const showNavigationConfirm = ref(false);
  const pendingNavigation = ref<'prev' | 'next' | null>(null);

  function performNavigation(direction: 'prev' | 'next') {
    isEditing.value = false;
    if (direction === 'prev') {
      currentWeekRef.value = currentWeekRef.value.subtract(1, 'week');
    } else {
      currentWeekRef.value = currentWeekRef.value.add(1, 'week');
    }
    pendingNavigation.value = null;
    prefetchAdjacentWeeks();
  }

  function requestWeekChange(direction: 'prev' | 'next') {
    if (isDirty.value && isEditing.value) {
      pendingNavigation.value = direction;
      showNavigationConfirm.value = true;
      return;
    }
    performNavigation(direction);
  }

  function confirmNavigationDiscard() {
    const dir = pendingNavigation.value;
    if (dir) performNavigation(dir);
  }

  function confirmNavigationAndSave(scope: SaveScope) {
    confirmAvailability(scope);
    const dir = pendingNavigation.value;
    if (dir) performNavigation(dir);
  }

  return {
    // Week
    currentWeekRef,
    weekDays,
    weekLabel,
    isPastWeek,
    goToPrevWeek: () => requestWeekChange('prev'),
    goToNextWeek: () => requestWeekChange('next'),

    // Campus Grades
    campusGrades,
    selectedGradeIdentifier,
    selectedGrade,
    campusShifts,
    campusScheduleLoading: campusGradesQuery.isLoading,

    // Disponibilidade
    weekQuery,

    // Edit
    isEditing,
    selectedDayWeek,
    selectedTimes,
    isDirty,
    enterEditMode,
    cancelEdit,
    confirmAvailability,

    // Save (deferred to form submit)
    pendingConfigs,
    undoPendingConfig,
    saveAvailability,
    hasPendingSave,
    invalidateDisponibilidade: disponibilidade.invalidate,

    // All configs
    allConfigsQuery: disponibilidade.findAllActive(turmaId),
    pendingDeactivations,
    addPendingDeactivation,
    undoPendingDeactivation,

    // Config info
    activeConfigInfo,
    currentWeekPending,

    // Divergence
    hasGradeDivergence,

    // Navigation confirmation
    showNavigationConfirm,
    pendingNavigation,
    confirmNavigationAndSave,
    confirmNavigationDiscard,
  };
}
