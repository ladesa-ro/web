// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Dayjs config
dayjs.locale('pt-br');

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
        StartDate: dayjs.Dayjs,
        EndDate: dayjs.Dayjs,
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
            await pushItemInList(
              steps![i].id,
              `${steps![i].number}° Etapa`,
              steps![i].startDate,
              steps![i].endDate,
              steps![i].color,
              steps![i].notifyStatus
            );
          }

          // Set events
          for (let i = 0; i < events!.length; i++) {
            await pushItemInList(
              events![i].id,
              events![i].name,
              events![i].startDate,
              events![i].endDate,
              events![i].color,
              events![i].notifyStatus
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
