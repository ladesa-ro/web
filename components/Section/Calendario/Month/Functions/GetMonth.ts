import type { Day, Event, Step } from '../../Typings';

// Dayjs
const dayjs = useDayJs();

// Functions
export const getMonth = {
  async setMonthData(year: number, month: number): Promise<Day[]> {
    try {
      // Clear array
      let daysInMonth: Array<Day> = [];

      // Repeat loop
      for (
        let i = 0;
        i < dayjs(dayjs(`${year!}-${month! + 1}-01`)).daysInMonth();
        i++
      ) {
        daysInMonth.push({
          num: i,
          day: dayjs(`${year!}-${month! + 1}-${i + 1}`).format('dddd'),
          date: dayjs(`${year!}-${month! + 1}-${i + 1}`),
          color: '#9ab69e',
          hoverActive: false,
        });
      }

      return daysInMonth;
    } catch (error) {
      return [];
    }
  },

  async setDatesColor(
    daysInMonth: Day[],
    steps: Step[] = [],
    events: Event[] = []
  ): Promise<Day[]> {
    try {
      // - Set steps -
      for (let i = 0; i < steps.length; i++) {
        // Check if date is between the start or end of the month
        for (let j = 0; j < daysInMonth.length; j++) {
          // Set start and end day color
          if (
            // Check if the date is between
            dayjs(daysInMonth[j].date).isBetween(
              steps[i].startDate,
              steps[i].endDate,
              'date',
              '[]'
            ) === true
          ) {
            // Set color
            daysInMonth[j].color = steps![i].color;
          } else {
          }
        }
      }

      // Set events
      for (let i = 0; i < events!.length; i++) {
        // Check if date is between the start or end of the month
        for (let j = 0; j < daysInMonth.length; j++) {
          // Set start and end day color
          if (
            // Check if the date is between
            dayjs(daysInMonth[j].date).isBetween(
              events![i].startDate,
              events![i].endDate,
              'date',
              '[]'
            )
          ) {
            // Set color
            daysInMonth[j].color = events![i].color;
          } else {
          }
        }
      }

      return daysInMonth;
    } catch (error) {
      return [];
    }
  },

  async getMonthData(
    year: number,
    month: number,
    steps: Array<Step> | undefined,
    events: Array<Event> | undefined
  ): Promise<Day[]> {
    try {
      // Set month and days with colors
      let daysInMonth: Array<Day> = await this.setMonthData(year, month);
      await this.setDatesColor(daysInMonth, steps, events);

      // Return days in month
      return daysInMonth;
    } catch (error) {
      return [];
    }
  },

  async getMonthColor(
    steps: Array<Step>,
    year: number,
    month: number
  ): Promise<string> {
    try {
      let monthColor: string = '';

      for (let i = 0; i < steps!.length; i++) {
        if (
          // Check if month is between the start or end of the step
          dayjs(
            `${year}-${month + 1}-${dayjs(steps[i].startDate).date()}`
          ).isBetween(steps[i].startDate, steps[i].endDate, 'date', '[]') ===
            true ||
          dayjs(
            `${year}-${month + 1}-${dayjs(steps[i].endDate).date()}`
          ).isBetween(steps[i].startDate, steps[i].endDate, 'date', '[]') ===
            true
        ) {
          monthColor = steps[i].color;
          break;
        } else {
          monthColor = '#9ab69e';
        }
      }
      return monthColor;
    } catch (error) {
      return '';
    }
  },
};
