import type { Dayjs } from 'dayjs';
import { getWeekDays } from '~/utils/get-week-days';

export function useTurmaEditState(currentWeekRef: Ref<Dayjs>) {
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
    const allDays = new Set([...Object.keys(editing), ...Object.keys(server)]);
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

  // Auto-select day
  watch(
    () => getWeekDays(currentWeekRef.value),
    days => {
      if (days.length > 0 && !selectedDayWeek.value) {
        selectedDayWeek.value = days[0]!.dayWeek;
      }
    },
    { immediate: true }
  );

  function applyAvailability(mapped: Record<number, string[]>) {
    serverAvailability.value = JSON.parse(JSON.stringify(mapped));
    if (!isEditing.value) {
      editingAvailability.value = JSON.parse(JSON.stringify(mapped));
    }
  }

  function enterEditMode(options: {
    hasGradeDivergence: boolean;
    selectAllTimes: () => void;
  }) {
    const hasServerData = Object.keys(serverAvailability.value).length > 0;
    if (options.hasGradeDivergence || !hasServerData) {
      options.selectAllTimes();
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
    isEditing,
    selectedDayWeek,
    editingAvailability,
    serverAvailability,
    selectedDayIndex,
    selectedTimes,
    isDirty,
    applyAvailability,
    enterEditMode,
    cancelEdit,
  };
}
