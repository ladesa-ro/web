// Import
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import type { Event, Step } from '../Typings';

// Dayjs
const dayjs = useDayJs();

export const getFormattedEvents = {
  async EventList(
    steps: Step[] | undefined,
    events: Event[] | undefined,
    year: number | undefined,
    month: number | undefined
  ): Promise<Event[]> {
    try {
      // Variables
      let formattedEvents: Array<Event> = [];

      // Push in 'Events' array
      async function pushItemInList(
        Id: string,
        Name: string,
        StartDate: Dayjs,
        EndDate: Dayjs,
        Color: string,
        NotifyStatus: boolean,
        Locale?: string
      ): Promise<void> {
        try {
          const eventItem: Event = {
            id: Id,
            name: Name,
            color: Color,
            startDate: StartDate,
            endDate: EndDate,
            locale: Locale,
            notifyStatus: NotifyStatus,
          };

          formattedEvents.push(eventItem);
        } catch (error) {}
      }

      // Set all events
      async function setAllItems(): Promise<void> {
        try {
          // Set steps
          for (let i = 0; i < steps!.length; i++) {
            const step = steps![i]!;

            await pushItemInList(
              step.id,
              `${step.number}° Etapa`,
              step.startDate,
              step.endDate,
              step.color,
              step.notifyStatus
            );
          }

          // Set events
          for (let i = 0; i < events!.length; i++) {
            const event = events![i]!;

            await pushItemInList(
              event.id,
              event.name,
              event.startDate,
              event.endDate,
              event.color,
              event.notifyStatus
            );
          }
        } catch (error) {}
      }

      // Order list by date
      async function OrderList(): Promise<void> {
        try {
          // Order
          formattedEvents = formattedEvents.slice().sort((a, b) => {
            // Save diff dates
            const date1 = dayjs(a.endDate).diff(dayjs().toDate());
            const date2 = dayjs(b.endDate).diff(dayjs().toDate());

            return date1 - date2;
          });
        } catch (error) {}
      }

      // Calling internal functions
      await setAllItems();
      await OrderList();

      // Return formatted events
      return formattedEvents;
    } catch (error) {
      return [];
    }
  },
};
