import type { Dayjs } from 'dayjs';
import { getWeekDays } from '~/utils/get-week-days';
import type { IWeekDay } from '~/components/Section/Horario/-Helpers/IWeekDay';

interface SaveScope {
  dataInicio: string;
  dataFim: string | null;
}

export interface UseTurmaWeekNavigationOptions {
  onNavigationBlocked?: () => void;
  onConfirmSave?: (scope: SaveScope) => void;
}

export function useTurmaWeekNavigation(
  turmaId: MaybeRef<string | null>,
  currentWeekRef: Ref<Dayjs>,
  isDirty: Ref<boolean>,
  isEditing: Ref<boolean>,
  options?: UseTurmaWeekNavigationOptions,
) {
  const dayjs = useDayJs();
  const disponibilidade = useTurmaDisponibilidade();

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

  // --- Prefetch ---

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

  // --- Navigation with dirty check ---

  let onNavigationBlockedCb = options?.onNavigationBlocked ?? null;
  const pendingNavigation = ref<'prev' | 'next' | null>(null);

  function setOnNavigationBlocked(cb: () => void) {
    onNavigationBlockedCb = cb;
  }

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
      onNavigationBlockedCb?.();
      return;
    }
    performNavigation(direction);
  }

  function confirmNavigationDiscard() {
    const dir = pendingNavigation.value;
    if (dir) performNavigation(dir);
  }

  function confirmNavigationAndSave(scope: SaveScope) {
    options?.onConfirmSave?.(scope);
    const dir = pendingNavigation.value;
    if (dir) performNavigation(dir);
  }

  return {
    currentWeekRef,
    weekDays,
    weekLabel,
    isPastWeek,
    goToPrevWeek: () => requestWeekChange('prev'),
    goToNextWeek: () => requestWeekChange('next'),
    setOnNavigationBlocked,
    pendingNavigation,
    confirmNavigationDiscard,
    confirmNavigationAndSave,
    prefetchAdjacentWeeks,
  };
}
