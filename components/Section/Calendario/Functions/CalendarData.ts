// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

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

type Calendar = {
  steps: Array<Step>;
  events: Array<Event>;
};

// Event and steps (For example. Remove in other moment)
const calendar: Calendar = {
  steps: [
    {
      id: '123452',
      number: 1,
      startDate: dayjs('2024-02-08'),
      endDate: dayjs('2024-03-23'),
      color: '#0092E4',
      notifyStatus: false,
    },
    {
      id: '24522',
      number: 2,
      startDate: dayjs('2024-03-24'),
      endDate: dayjs('2024-05-14'),
      color: '#2DAC0D',
      notifyStatus: false,
    },
    {
      id: '3456',
      number: 3,
      startDate: dayjs('2024-05-15'),
      endDate: dayjs('2024-07-09'),
      color: '#D1A300',
      notifyStatus: false,
    },
    {
      id: '544',
      number: 4,
      startDate: dayjs('2024-08-10'),
      endDate: dayjs('2024-11-28'),
      color: '#D7004D',
      notifyStatus: false,
    },
  ],
  events: [
    {
      id: '121312',
      name: 'IFRO Party',
      startDate: dayjs('2024-05-15T00:00:00'),
      endDate: dayjs('2024-05-22T00:00:00'),
      locale: 'Refeitório',
      color: '#B51B2A',
      notifyStatus: false,
    },
    {
      id: '1242',
      name: 'IFRO Party 2',
      startDate: dayjs('2024-05-15T00:00:00'),
      endDate: dayjs('2024-05-22T00:00:00'),
      color: '#211F1B',
      notifyStatus: false,
    },
    {
      id: '12345',
      name: 'IFRO Party 3',
      startDate: dayjs('2024-07-16T16:30:00'),
      endDate: dayjs('2024-07-26T18:20:00'),
      locale: 'Refeitório',
      color: '#0092E4',
      notifyStatus: false,
    },
    {
      id: '124145',
      name: 'Champions 2024',
      startDate: dayjs('2024-08-01T05:00:00'),
      endDate: dayjs('2024-08-25T20:00:00'),
      locale: 'Refeitório',
      color: '#0092E4',
      notifyStatus: false,
    },
  ],
};

export const calendarData = {
  // Get all steps
  async getSteps(): Promise<Step[]> {
    try {
      return calendar.steps;
    } catch (error) {
      return [];
    }
  },

  // Get all events
  async getEvents(): Promise<Event[]> {
    try {
      return calendar.events;
    } catch (error) {
      return [];
    }
  },

  // Toggle notification status
  async notifyEvent(itemId: string, notify: boolean): Promise<void> {
    try {
      let itemIndex;

      // Get step
      itemIndex = calendar.steps.findIndex((step) => step.id === itemId);

      // Get event
      if (itemIndex <= 0) {
        itemIndex = calendar.events.findIndex((event) => event.id === itemId);
      }

      // Set notification status
      // For step
      if (calendar.steps.find((step) => step.id === itemId)) {
        calendar.steps[itemIndex].notifyStatus = notify;
      }
      // For event
      else {
        calendar.events[itemIndex].notifyStatus = notify;
      }
    } catch (error) {}
  },
};
