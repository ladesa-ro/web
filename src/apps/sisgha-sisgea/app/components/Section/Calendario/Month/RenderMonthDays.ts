// # IMPORT
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import type { CalendarEvent, Day, EmptyDays } from '../Types';

// # CODE

export const renderDays = {
  EmptyDays: (year: number, month: number): EmptyDays => {
    let emptyDays: EmptyDays = {
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
    let days: Array<Day> = [];

    try {
      // Formatting Days
      for (
        let i = 0;
        i <
        Number(dayjs(`${year}-${currentMonth}-01`).endOf('month').format('D'));
        i++
      ) {
        let day: Day = {
          date: dayjs(`${year}-${currentMonth}-${i + 1}`).format('YYYY-MM-DD'),
          color: 'none',
        };

        // Set Colors
        if (events) {
          dayjs.extend(isBetween);

          for (let j = 0; j < events.length; j++) {
            // Check Between Date
            // Dates for Check
            const startOfEvent = dayjs(events[j]!.startDate).format(
              'YYYY-MM-DD'
            );
            const endOfEvent = dayjs(events[j]!.endDate).format('YYYY-MM-DD');
            if (
              dayjs(day.date).isBetween(
                startOfEvent,
                endOfEvent,
                undefined,
                '[]'
              ) ||
              dayjs(day.date).isBetween(
                startOfEvent,
                endOfEvent,
                undefined,
                '[]'
              )
            ) {
              day.color = `${events[j]!.color}`;
            }
          }
        }

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
