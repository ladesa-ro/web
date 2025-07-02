// # IMPORT
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
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
      emptyDays.before = Number(firstDayOfMonth.day()) + 1;
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

      /* const daysAPI = ref(
        const calendarDayFilter: DiaCalendarioListData = {
          filterCalendarioId: [calendarId],
        };
          
        await getApiClient().diasCalendarios.diaCalendarioList(
          calendarDayFilter
        ).promise
       ); */
      for (
        let i = 0;
        i <
        Number(dayjs(`${year}-${currentMonth}-01`).endOf('month').format('D'));
        i++
      ) {
        let day: Day = {
          date: dayjs(`${year}-${currentMonth}-${i + 1}`).format('YYYY-MM-DD'),
          color: '',
        };

        // Set Colors
        /* if (events) {
          dayjs.extend(isBetween);

          // Dates for Check
          const startOfMonth = dayjs(`${year}-${currentMonth}-01`).format(
            'YYYY-MM-DD'
            );
          const endOfMonth = dayjs(`${year}-${currentMonth}-01`)
            .endOf('month')
            .format('YYYY-MM-DD');

            for (let j = 0; j < events.length; j++) {
              // Check Between Date
              if (
                dayjs(events[j]!.startDate).isBetween(
                  startOfMonth,
                  endOfMonth,
                  undefined,
                  '()'
                  ) ||
              dayjs(events[j]!.endDate).isBetween(
                startOfMonth,
                endOfMonth,
                undefined,
                '()'
              )
            ) {
              day.color = `${events[j]!.color}`;
            }
          }
        }*/

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
