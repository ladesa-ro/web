// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Dayjs config
dayjs.locale('pt-br');

// Functions
export const getEmptyDays = {
  async beforeDays(year: number, month: number): Promise<number> {
    try {
      // Calc before days
      let beforeDays = dayjs(`${year!}-${month + 1}-01`).day();

      return beforeDays;
    } catch (error) {
      return 0;
    }
  },

  async afterDays(
    year: number,
    month: number,
    daysInMonth: number
  ): Promise<number> {
    try {
      // Calc after days
      let afterDays =
        7 * 6 - (dayjs(`${year!}-${month + 1}-01`).day() + daysInMonth!);

      return afterDays;
    } catch (error) {
      return 0;
    }
  },
};
