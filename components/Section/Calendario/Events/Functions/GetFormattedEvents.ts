// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';

// Dayjs config
dayjs.locale('pt-br');
dayjs.extend(isBetween);

// Interface and types
type EventData = {
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
};

type Step = EventData & {
  number: number;
};

type Event = EventData & {
  name: string;
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs;
  locale?: string;
};

export const getFormattedEvents = {
  async EventList(
    steps: Step[] | undefined,
    events: Event[] | undefined,
    listingType: number | undefined,
    year: number | undefined,
    month: number | undefined
  ): Promise<Event[]> {
    try {
      // Variables
      let formattedEvents = ref<Event[]>([]);
  
      // Push in 'Events' array
      async function pushItemInList(
        Id: string,
        Name: string,
        StartDate: dayjs.Dayjs,
        EndDate: dayjs.Dayjs,
        Color: string,
        Locale?: string,
        StartTime?: dayjs.Dayjs,
        EndTime?: dayjs.Dayjs
      ): Promise<void> {
        try {
          const eventItem: Event = {
            id: Id,
            name: Name,
            color: Color,
            startDate: StartDate,
            endDate: EndDate,
            locale: Locale,
            startTime: StartDate,
            endTime: EndDate,
          };
  
          formattedEvents.value.push(eventItem);
        } catch (error) {}
      }
  
      // Set all events
      async function setAllItems(): Promise<boolean> {
        try {
          // Clear array from events
          if (listingType! === 2) formattedEvents.value = [];
  
          // Set steps
          for (let i = 0; i < steps!.length; i++) {
            await pushItemInList(
              steps![i].id,
              `${steps![i].number}° Etapa`,
              steps![i].startDate,
              steps![i].endDate,
              steps![i].color
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
              events![i].locale,
              events![i].startTime,
              events![i].endTime
            );
          }
  
          return true;
        } catch (error) {
          return false;
        }
      }
  
      // Order list by date
      async function OrderList(): Promise<void> {
        try {
          // Order
          formattedEvents.value = formattedEvents.value.slice().sort((a, b) => {
            // Save diff dates
            const date1 = dayjs(a.endDate).diff(dayjs().toDate());
            const date2 = dayjs(b.endDate).diff(dayjs().toDate());
  
            return date1 - date2;
          });
  
          // Order events by month
          const firstDayOfMonth = dayjs(`${year!}-${month! + 1}-01`);
  
          // Filter items
          if (listingType! === 2) {
            formattedEvents.value = formattedEvents.value.filter(
              (event) =>
                (dayjs(event.startDate) >= firstDayOfMonth.startOf('month') ||
                  dayjs(event.endDate) >= firstDayOfMonth.startOf('month')) &&
                dayjs(event.startDate) <= firstDayOfMonth.endOf('month')
            );
          }
        } catch (error) {}
      }
  
      // Calling internal functions
      await setAllItems();
      await OrderList();
  
      // Return formatted events
      return formattedEvents.value;
    } catch (error) {
      return [];
    }
  }
}

