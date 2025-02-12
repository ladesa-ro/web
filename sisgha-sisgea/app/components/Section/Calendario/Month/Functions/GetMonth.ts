import type { Day, Event, Step } from '../../Typings';

// Dayjs
const dayjs = useDayJs();

// Functions
export const getMonth = {
  async setMonthData(year: number, month: number): Promise<Day[]> {
    try {
      // Clear array
      const daysInMonth: Array<Day> = [];

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
        const step = steps[i]!;

        // Check if date is between the start or end of the month
        for (let j = 0; j < daysInMonth.length; j++) {
          // Set start and end day color
          const dayInMonth = daysInMonth[j]!;

          if (
            // Check if the date is between
            dayjs(dayInMonth.date).isBetween(
              step.startDate,
              step.endDate,
              'date',
              '[]'
            ) === true
          ) {
            // Set color
            dayInMonth.color = step.color;
          } else {
          }
        }
      }

      // Set events
      for (let i = 0; i < events.length; i++) {
        const event = events[i]!;

        // Check if date is between the start or end of the month
        for (let j = 0; j < daysInMonth.length; j++) {
          const dayInMonth = daysInMonth[j]!;

          // Set start and end day color
          if (
            // Check if the date is between
            dayjs(dayInMonth.date).isBetween(
              event.startDate,
              event.endDate,
              'date',
              '[]'
            )
          ) {
            // Set color
            dayInMonth.color = event.color;
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
      const daysInMonth: Array<Day> = await this.setMonthData(year, month);
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

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]!;

        if (
          // Check if month is between the start or end of the step
          dayjs(
            `${year}-${month + 1}-${dayjs(step.startDate).date()}`
          ).isBetween(step.startDate, step.endDate, 'date', '[]') === true ||
          dayjs(`${year}-${month + 1}-${dayjs(step.endDate).date()}`).isBetween(
            step.startDate,
            step.endDate,
            'date',
            '[]'
          ) === true
        ) {
          monthColor = step.color;
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
