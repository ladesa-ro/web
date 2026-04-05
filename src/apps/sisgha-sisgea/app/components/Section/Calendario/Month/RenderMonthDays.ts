// # IMPORT
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import type { CalendarEvent, Day, EmptyDays } from '../Types';

// # SETUP
dayjs.extend(isBetween);

// # CODE

export const renderDays = {
  EmptyDays: (year: number, month: number): EmptyDays => {
    const emptyDays: EmptyDays = {
      before: 0,
      after: 0,
    };

    try {
      // Get Month Infos
      const firstDayOfMonth = dayjs(`${year}-${month}-01`);
      const lastDayOfMonth: number = Number(
        firstDayOfMonth.endOf('month').format('D')
      );

      // Calc Empty Days
      emptyDays.before = Number(firstDayOfMonth.day());
      emptyDays.after = 7 * 6 - (emptyDays.before + lastDayOfMonth);

      return emptyDays;
    } catch (error) {
      console.error('Erro: ', error);
      return emptyDays;
    }
  },
  MonthDays: async (
    year: number,
    currentMonth: number,
    events: Array<CalendarEvent>,
    calendarId: string
  ): Promise<Day[]> => {
    const days: Array<Day> = [];

    try {
      // Pre-process events into a date→color map (O(m) where m = total event-days)
      const dateColorMap = new Map<string, string>();

      if (events) {
        for (let j = 0; j < events.length; j++) {
          const event = events[j];
          if (!event) continue;
          let current = dayjs(event.startDate).startOf('day');
          const end = dayjs(event.endDate).startOf('day');

          while (current.isBefore(end) || current.isSame(end, 'day')) {
            const key = current.format('YYYY-MM-DD');
            if (event.color) {
              dateColorMap.set(key, event.color);
            }
            current = current.add(1, 'day');
          }
        }
      }

      // Formatting Days
      const daysInMonth = Number(
        dayjs(`${year}-${currentMonth}-01`).endOf('month').format('D')
      );

      for (let i = 0; i < daysInMonth; i++) {
        const dateStr = dayjs(`${year}-${currentMonth}-${i + 1}`).format(
          'YYYY-MM-DD'
        );

        const day: Day = {
          date: dateStr,
          color: dateColorMap.get(dateStr) ?? 'none',
        };

        // Push in Array
        days.push(day);
      }
      return days;
    } catch (error) {
      console.error('Erro: ', error);
      return days;
    }
  },
};
