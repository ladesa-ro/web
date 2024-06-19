import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.locale('pt-br');

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

export default dayjs;
