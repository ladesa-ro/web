import type { BetweenDates, Event, Step } from '../Typings';

// Import functions
import { getFormattedEvents } from './GetFormattedEvents';

// Dayjs
const dayjs = useDayJs();

export async function getOrdenedEventList(
  steps: Step[] | undefined,
  events: Event[] | undefined,
  year: number | undefined,
  monthNum: number | undefined,
  orderBy?: string,
  betweenDates?: BetweenDates
): Promise<Event[]> {
  try {
    const allEventItems = ref<Event[]>([]);
    allEventItems.value = await getFormattedEvents.EventList(
      steps,
      events,
      year,
      monthNum
    );

    // Order events by month
    if (orderBy === 'Mês' || orderBy === 'month') {
      const firstDayOfMonth = dayjs(`${year!}-${monthNum! + 1}-01`);

      // Filter items
      allEventItems.value = allEventItems.value.filter(
        event =>
          (dayjs(event.endDate) >= firstDayOfMonth.startOf('month') ||
            dayjs(event.startDate) >= firstDayOfMonth.startOf('month')) &&
          dayjs(event.startDate) <= firstDayOfMonth.endOf('month')
      );
    }
    // Order events by bimonthly or semester
    else if (
      orderBy === 'Bimestre' ||
      orderBy === 'bimonthly' ||
      orderBy === 'Semestre' ||
      orderBy === 'semester'
    ) {
      // Filter items
      allEventItems.value = allEventItems.value.filter(
        event =>
          // Check start date
          dayjs(event.startDate).isBetween(
            betweenDates!.startDate,
            betweenDates!.endDate,
            null
          ) ||
          // Check end date
          dayjs(event.endDate).isBetween(
            betweenDates!.startDate,
            betweenDates!.endDate,
            null
          )
      );
    }
    // Order events by events
    else {
    }
    return allEventItems.value;
  } catch (error) {
    return [];
  }
}
