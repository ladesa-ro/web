// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { ref } from 'vue';

// Dayjs config
dayjs.locale('pt-br');

// Interface and types
type EventData = {
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
  notifyStatus: boolean;
};

// Filter types
type BetweenDates = Omit<EventData, 'id' | 'color' | 'notifyStatus'> & {
  name: string;
};

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
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
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
      // if (type === 'month') return filterTypes.months;
      if (type === 'bimonthly') return filterTypes.bimonthlys.value;
      else if (type === 'semester') return filterTypes.semesters.value;
      else return [];
    } catch (error) {
      return [];
    }
  },
};
