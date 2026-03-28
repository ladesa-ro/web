import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.locale(ptBR);

dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);

dayjs.updateLocale('pt-br', {
  weekdays: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
});

export const useDayJs = () => {
  return dayjs;
};
