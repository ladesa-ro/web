// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';

// Import functions
import { getFormattedEvents } from '../Functions/GetFormattedEvents';

// Dayjs config
dayjs.locale('pt-br');
dayjs.extend(isBetween);

// Interface and types
type EventData = {
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
  notifyStatus: boolean;
};

type Step = EventData & {
  number: number;
};

type Event = EventData & {
  name: string;
  locale?: string;
};

// Filter types
type BetweenDates = Omit<EventData, 'id' | 'color' | 'notifyStatus'> & {
  name: string;
};

export async function getOrdenedEventList(
  steps: Array<Step>,
  events: Array<Event>,
  year: number,
  monthNum: number,
  orderBy?: string,
  betweenDates?: BetweenDates
): Promise<Event[]> {
  try {
    let allEventItems = ref<Event[]>([]);
    allEventItems.value = await getFormattedEvents.EventList(
      steps!,
      events!,
      year!,
      monthNum
    );

    // Order events by month
    if (orderBy === 'month') {
      const firstDayOfMonth = dayjs(`${year!}-${monthNum! + 1}-01`);

      // Filter items
      allEventItems.value = allEventItems.value.filter(
        (event) =>
          (dayjs(event.endDate) >= firstDayOfMonth.startOf('month') ||
            dayjs(event.startDate) >= firstDayOfMonth.startOf('month')) &&
          dayjs(event.startDate) <= firstDayOfMonth.endOf('month')
      );
    }
    // Order events by bimonthly or semester
    else if (orderBy === 'bimonthly' || orderBy === 'semester') {
      // Filter items
      allEventItems.value = allEventItems.value.filter(
        (event) =>
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
