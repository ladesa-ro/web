import { ref } from 'vue';
import type { BetweenDates } from '../Typings';

// Dayjs
const dayjs = useDayJs();

export const eventFilters = {
  async getFilter(type: string, setYear?: number): Promise<BetweenDates[]> {
    try {
      // Set year
      let year: number;

      if (setYear) year = setYear;
      else year = Number(dayjs(dayjs().toDate()).format('YYYY'));

      // --- Filter Types ---
      const filterTypes = {
        // Month filter
        months: [
          //
          {
            name: dayjs().month(0).format('MMMM'),
            startDate: dayjs(`${year}-01-01`),
            endDate: dayjs(`${year}-01-01`).endOf('month'),
          },
          {
            name: dayjs().month(1).format('MMMM'),
            startDate: dayjs(`${year}-02-01`),
            endDate: dayjs(`${year}-02-01`).endOf('month'),
          },
          {
            name: dayjs().month(2).format('MMMM'),
            startDate: dayjs(`${year}-03-01`),
            endDate: dayjs(`${year}-03-01`).endOf('month'),
          },
          {
            name: dayjs().month(3).format('MMMM'),
            startDate: dayjs(`${year}-04-01`),
            endDate: dayjs(`${year}-04-01`).endOf('month'),
          },
          {
            name: dayjs().month(4).format('MMMM'),
            startDate: dayjs(`${year}-05-01`),
            endDate: dayjs(`${year}-05-01`).endOf('month'),
          },
          {
            name: dayjs().month(5).format('MMMM'),
            startDate: dayjs(`${year}-06-01`),
            endDate: dayjs(`${year}-06-01`).endOf('month'),
          },
          {
            name: dayjs().month(6).format('MMMM'),
            startDate: dayjs(`${year}-07-01`),
            endDate: dayjs(`${year}-07-01`).endOf('month'),
          },
          {
            name: dayjs().month(7).format('MMMM'),
            startDate: dayjs(`${year}-08-01`),
            endDate: dayjs(`${year}-08-01`).endOf('month'),
          },
          {
            name: dayjs().month(8).format('MMMM'),
            startDate: dayjs(`${year}-09-01`),
            endDate: dayjs(`${year}-09-01`).endOf('month'),
          },
          {
            name: dayjs().month(9).format('MMMM'),
            startDate: dayjs(`${year}-10-01`),
            endDate: dayjs(`${year}-10-01`).endOf('month'),
          },
          {
            name: dayjs().month(10).format('MMMM'),
            startDate: dayjs(`${year}-11-01`),
            endDate: dayjs(`${year}-11-01`).endOf('month'),
          },
          {
            name: dayjs().month(11).format('MMMM'),
            startDate: dayjs(`${year}-12-01`),
            endDate: dayjs(`${year}-12-01`).endOf('month'),
          },
        ],
        // Bimonthly filter
        bimonthlys: ref<BetweenDates[]>([
          // One
          {
            name: '1° Bimestre',
            startDate: dayjs(`${year}-01-01`),
            endDate: dayjs(`${year}-03-01`).endOf('month'),
          },

          // Two
          {
            name: '2° Bimestre',
            startDate: dayjs(`${year}-04-01`),
            endDate: dayjs(`${year}-06-01`).endOf('month'),
          },

          // Three
          {
            name: '3° Bimestre',
            startDate: dayjs(`${year}-07-01`),
            endDate: dayjs(`${year}-09-01`).endOf('month'),
          },

          // Four
          {
            name: '4° Bimestre',
            startDate: dayjs(`${year}-10-01`),
            endDate: dayjs(`${year}-12-01`).endOf('month'),
          },
        ]),

        // Semester filter
        semesters: ref<BetweenDates[]>([
          // One
          {
            name: '1° Semestre',
            startDate: dayjs(`${year}-01-01`),
            endDate: dayjs(`${year}-06-01`).endOf('month'),
          },

          // Two
          {
            name: '2° Semestre',
            startDate: dayjs(`${year}-07-01`),
            endDate: dayjs(`${year}-12-01`).endOf('month'),
          },
        ]),
      };

      // Return requested filter type
      if (type === 'Mês') return filterTypes.months;
      if (type === 'Bimestre') return filterTypes.bimonthlys.value;
      else if (type === 'Semestre') return filterTypes.semesters.value;
      else return [];
    } catch (error) {
      return [];
    }
  },
};
