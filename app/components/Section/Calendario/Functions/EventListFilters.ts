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
            name: 'Janeiro',
            startDate: dayjs(`${year}-01-01`),
            endDate: dayjs(`${year}-01-01`).endOf('month'),
          },
          {
            name: 'Fevereiro',
            startDate: dayjs(`${year}-02-01`),
            endDate: dayjs(`${year}-02-01`).endOf('month'),
          },
          {
            name: 'Março',
            startDate: dayjs(`${year}-03-01`),
            endDate: dayjs(`${year}-03-01`).endOf('month'),
          },
          {
            name: 'Abril',
            startDate: dayjs(`${year}-04-01`),
            endDate: dayjs(`${year}-04-01`).endOf('month'),
          },
          {
            name: 'Maio',
            startDate: dayjs(`${year}-05-01`),
            endDate: dayjs(`${year}-05-01`).endOf('month'),
          },
          {
            name: 'Junho',
            startDate: dayjs(`${year}-06-01`),
            endDate: dayjs(`${year}-06-01`).endOf('month'),
          },
          {
            name: 'Julho',
            startDate: dayjs(`${year}-07-01`),
            endDate: dayjs(`${year}-07-01`).endOf('month'),
          },
          {
            name: 'Agosto',
            startDate: dayjs(`${year}-08-01`),
            endDate: dayjs(`${year}-08-01`).endOf('month'),
          },
          {
            name: 'Setembro',
            startDate: dayjs(`${year}-09-01`),
            endDate: dayjs(`${year}-09-01`).endOf('month'),
          },
          {
            name: 'Outubro',
            startDate: dayjs(`${year}-10-01`),
            endDate: dayjs(`${year}-10-01`).endOf('month'),
          },
          {
            name: 'Novembro',
            startDate: dayjs(`${year}-11-01`),
            endDate: dayjs(`${year}-11-01`).endOf('month'),
          },
          {
            name: 'Dezembro',
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
