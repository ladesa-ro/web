import type { BetweenDates, Event, Step } from '../Typings';

// Import functions
import { getFormattedEvents } from './GetFormattedEvents';

// Dayjs
const dayjs = useDayJs();

export async function getOrdenedItemList(
  steps: Step[] | undefined,
  events: Event[] | undefined,
  year: number | undefined,
  monthNum: number | undefined,
  orderBy?: string,
  betweenDates?: BetweenDates
): Promise<Event[]> {
  try {
    events = await getFormattedEvents.EventList(steps, events);

    // Order events by month
    if (orderBy === 'Mês' || orderBy === 'month') {
      const firstDayOfMonth = dayjs(`${year!}-${monthNum! + 1}-01`);

      // Filter items
      events = events.filter(
        (event) =>
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
      events = events.filter(
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
      return events;
    }

    return events;
  } catch (error) {
    return [];
  }
}

export async function getOrdenedTypeAccordionList(
  orderBy: string,
  orderType: string,
  accordions: BetweenDates[]
): Promise<BetweenDates[]> {
  try {
    // Order type of list
    // Decreasing
    if (orderType === 'Decrescente') {
      // Month
      if (orderBy !== null && orderBy === 'Mês') {
        accordions = accordions!.sort(
          (a, b) =>
            dayjs(b.name, 'MMMM').month() - dayjs(a.name, 'MMMM').month()
        );
      }

      // Bimonthly and Semester
      else if (
        orderBy !== null &&
        (orderBy === 'Bimestre' || orderBy === 'Semestre')
      ) {
        accordions = accordions!.sort(
          (a, b) => Number(b.name.charAt(0)) - Number(a.name.charAt(0))
        );
      }
    }

    // Increasing
    else {
      // Month
      if (orderBy === 'Mês') {
        accordions = accordions!.sort(
          (a, b) =>
            dayjs(a.name, 'MMMM').month() - dayjs(b.name, 'MMMM').month()
        );
      }

      // Bimonthly and Semester
      else if (orderBy === 'Bimestre' || orderBy === 'Semestre') {
        accordions = accordions!.sort(
          (a, b) => Number(a.name.charAt(0)) - Number(b.name.charAt(0))
        );
      }
    }

    // Return
    return accordions;
  } catch (error) {
    return [];
  }
}

export async function getOrdenedTypeEventList(
  orderType: string,
  events: Event[]
): Promise<Event[]> {
  try {
    // Order events
    // Decreasing
    if (orderType === 'Decrescente') {
      // Events
      events = events!.sort((a, b) =>
        dayjs(b.endDate).diff(dayjs(a.startDate))
      );
    }

    // Increasing
    else {
      // Events
      events = events!.sort((a, b) =>
        dayjs(a.startDate).diff(dayjs(b.endDate))
      );
    }

    // Return
    return events;
  } catch (error) {
    return [];
  }
}
