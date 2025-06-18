// # Import Libs & Others
import dayjs from 'dayjs';
import type { EmptyDays } from '../Types';

// # Import Types

// # Import Functions

// # Code

export const renderDays = {
  EmptyDays: (year: number, month: string): EmptyDays => {
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
      emptyDays.before = Number(firstDayOfMonth.format('d'));
      emptyDays.after = 7 * 6 - (emptyDays.before + lastDayOfMonth);

      return emptyDays;
    } catch (error) {
      console.error('Error rendering empty days:', error);
      return emptyDays;
    }
  },
};
