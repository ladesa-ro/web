import baseDayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';

const WEEKDAY_NAMES = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

let alreadyConfigured = false;

export function configureDayjs(): typeof baseDayjs {
  if (alreadyConfigured) return baseDayjs;

  baseDayjs.extend(isBetween);
  baseDayjs.extend(weekOfYear);
  baseDayjs.extend(updateLocale);
  baseDayjs.extend(customParseFormat);

  baseDayjs.locale(ptBr);
  baseDayjs.updateLocale('pt-br', { weekdays: WEEKDAY_NAMES });

  alreadyConfigured = true;

  return baseDayjs;
}

export const dayjs = configureDayjs();
