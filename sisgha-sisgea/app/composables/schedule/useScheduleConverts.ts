import type { Dayjs } from 'dayjs';
import type { Horario, HorDayjs, HorString } from './useScheduleTypes';

export const convertStringToDayJs = (
  horario: Horario & HorString
): Horario & HorDayjs => {
  const baseReturn = {
    ...horario,
    date: useDayJs()(horario.date),
    startHour: useDayJs()(`${horario.date} ${horario.startHour}`),
    endHour: useDayJs()(`${horario.date} ${horario.endHour}`),
  } as Horario & HorDayjs;

  if (horario.type === 'transicaoDia') {
    return {
      ...baseReturn,
      endHour: useDayJs()(horario.endHour),
    } as Horario & HorDayjs;
  }

  return baseReturn;
};

export const convertDayJsToString = (
  horario: Horario & HorDayjs
): Horario & HorString => {
  const baseReturn = {
    ...horario,
    date: horario.date!.format('YYYY-MM-DD'),
    startHour: horario.startHour.format('hh:mm'),
    endHour: horario.endHour.format('hh:mm'),
  } as Horario & HorString;

  if (horario.type === 'transicaoDia') {
    return {
      ...baseReturn,
      endHour: (horario.endHour as Dayjs).format('YYYY-MM-DD'),
    } as Horario & HorString;
  }

  return baseReturn;
};
