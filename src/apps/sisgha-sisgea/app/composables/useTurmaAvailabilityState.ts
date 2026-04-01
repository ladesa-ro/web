import type { Dayjs } from 'dayjs';
import { FormMode } from '~/utils/constants';
import { getWeekDays } from '~/utils/get-week-days';
import {
  agruparPorPeriodo,
  toDisplayFormat,
  toApiFormat,
} from '~/utils/horarios';
import type { DayShift } from '~/composables/useAvailability';
import type { IWeekDay } from '~/components/Section/Horario/-Helpers/IWeekDay';
import type {
  TurmaDisponibilidadeConfigInputDto,
  TurmaDisponibilidadeWeekOutputDto,
} from '@ladesa-ro/web.api.client';

export function useTurmaAvailabilityState(
  turmaId: MaybeRef<string | null>,
  mode: MaybeRef<FormMode>,
  campusIdExternal?: MaybeRef<string | null>
) {
  const dayjs = useDayJs();
  const horariosDeAula = useHorariosDeAula();
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

  // --- Campus Schedule (source of checkboxes) ---

  const campusScheduleQuery = horariosDeAula.findAtual(campusId);

  const campusShifts = computed<DayShift[]>(() => {
    const items = campusScheduleQuery.data.value?.data ?? [];
    const intervalos = items.map(item => ({
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

  watch(
    () => weekQuery.data.value,
    data => {
      // Se há config pendente para esta semana, usar ela em vez do servidor
      const weekKey = currentWeekRef.value.format('YYYY-MM-DD');
      const pending = pendingConfigs.value.get(weekKey);

      if (pending) {
        const mapped: Record<number, string[]> = {};
        for (const dia of pending.horarios) {
          mapped[dia.dia_semana] = dia.intervalos.map(i =>
            toDisplayFormat(i.inicio)
          );
        }
        serverAvailability.value = JSON.parse(JSON.stringify(mapped));
        if (!isEditing.value) {
          editingAvailability.value = JSON.parse(JSON.stringify(mapped));
        }
      } else {
        const mapped = mapConfigToAvailability(data);
        serverAvailability.value = JSON.parse(JSON.stringify(mapped));
        if (!isEditing.value) {
          editingAvailability.value = JSON.parse(JSON.stringify(mapped));
        }
      }
    }
  );

  // Set initial selected day when weekDays changes
  watch(
    weekDays,
    days => {
      if (days.length > 0 && !selectedDayWeek.value) {
        selectedDayWeek.value = days[0]!.dayWeek;
      }
    },
    { immediate: true }
  );

  // --- Grade Divergence Detection (via horários do campus) ---

  const hasGradeDivergence = computed(() => {
    const currentTimes = new Set(allCampusTimes.value);
    if (currentTimes.size === 0) return false;
    for (const times of Object.values(serverAvailability.value)) {
      for (const t of times) {
        if (!currentTimes.has(t)) return true;
      }
    }
    return false;
  });

  // --- Pending Save (deferred to form submit) ---
  // Acumula configs de múltiplas semanas. Chave = data_inicio (domingo da semana).

  const pendingConfigs = ref<Map<string, TurmaDisponibilidadeConfigInputDto>>(new Map());

  const hasPendingSave = computed(() => pendingConfigs.value.size > 0);

  function buildConfig(aplicarFuturas: boolean): TurmaDisponibilidadeConfigInputDto {
    const sunday = currentWeekRef.value;
    const saturday = sunday.add(6, 'day');

    const horarios = Object.entries(editingAvailability.value)
      .filter(([, times]) => times.length > 0)
      .map(([diaSemana, times]) => {
        const campusItems = campusScheduleQuery.data.value?.data ?? [];
        const intervalos = times.map(displayTime => {
          const match = campusItems.find(
            item => toDisplayFormat(item.inicio) === displayTime
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
      data_inicio: sunday.format('YYYY-MM-DD'),
      data_fim: aplicarFuturas ? null : saturday.format('YYYY-MM-DD'),
      horarios,
    };
  }

  /** Confirma edição localmente (sem chamar API). Acumula config pendente. */
  function confirmAvailability(aplicarFuturas: boolean) {
    const config = buildConfig(aplicarFuturas);
    const newMap = new Map(pendingConfigs.value);
    newMap.set(config.data_inicio, config);
    pendingConfigs.value = newMap;

    // Atualiza estado local para refletir a mudança na UI
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

  /** Envia todas as configs pendentes para a API. Chamado pelo Form.vue no submit. */
  async function saveAvailability() {
    const id = unref(turmaId);
    if (!id || pendingConfigs.value.size === 0) return;

    const configs = [...pendingConfigs.value.values()];

    await disponibilidade.save(id, { configs });
    await disponibilidade.invalidate();
    pendingConfigs.value = new Map();
  }

  // --- Actions ---

  function enterEditMode() {
    if (hasGradeDivergence.value) {
      // Reset all checkboxes when grade diverged
      editingAvailability.value = {};
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

  function confirmNavigationAndSave(aplicarFuturas: boolean) {
    confirmAvailability(aplicarFuturas);
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

    // Campus
    campusShifts,
    campusScheduleLoading: campusScheduleQuery.isLoading,

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
    saveAvailability,
    hasPendingSave,

    // Divergence
    hasGradeDivergence,

    // Navigation confirmation
    showNavigationConfirm,
    pendingNavigation,
    confirmNavigationAndSave,
    confirmNavigationDiscard,
  };
}
