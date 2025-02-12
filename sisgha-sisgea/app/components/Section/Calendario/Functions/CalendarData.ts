// Import
import type { Calendar } from '../Typings';

const dayjs = useDayJs();

// Event and steps (For example. Remove in other moment)
const calendar: Calendar = {
  id: 'sF456',
  name: 'Informática 2024',
  year: 2024,
  modality: 'Técnico Integrado ao Ensino Médio',
  course: 'Técnico em Informática',
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
  // Get calendar
  async getCalendar(
    year?: string,
    modality?: string,
    name?: string
  ): Promise<Calendar | undefined> {
    try {
      let filterCalendar;

      if (year || modality || name) {
      } else {
        return calendar;
      }
    } catch (error) {
      return undefined;
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

      const itemAtIndex = calendar.steps[itemIndex];
      if (itemAtIndex) {
        // Set notification status
        // For step
        if (calendar.steps.find((step) => step.id === itemId)) {
          itemAtIndex.notifyStatus = notify;
        }
        // For event
        else {
          itemAtIndex.notifyStatus = notify;
        }
      }
    } catch (error) {}
  },
};
