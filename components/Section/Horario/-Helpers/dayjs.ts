import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.locale('pt-br');
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);
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
