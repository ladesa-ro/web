import dayjs from 'dayjs';
import { ref, watch, type Ref } from 'vue';
import { calendarDataMethods } from './CalendarDataMethods';
import type { CalendarEvent } from './Types';

export function useCalendarEvents(calendarId: Ref<string | undefined>) {
  const events = ref<CalendarEvent[]>([]);
  const isLoading = ref(false);

  const loadEvents = async () => {
    if (!calendarId.value) return;
    isLoading.value = true;
    try {
      const [steps, evs] = await Promise.all([
        calendarDataMethods.steps.getSteps(calendarId.value),
        calendarDataMethods.events.getEvents(calendarId.value),
      ]);

      events.value = Array.from(
        new Map([...steps, ...evs].map(e => [e.id, e])).values()
      ).sort(
        (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
      );
    } finally {
      isLoading.value = false;
    }
  };

  watch(
    calendarId,
    async () => {
      await loadEvents();
    },
    { immediate: true }
  );

  return { events, isLoading, reload: loadEvents };
}
