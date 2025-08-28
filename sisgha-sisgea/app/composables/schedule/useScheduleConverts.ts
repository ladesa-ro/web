import type { Dayjs } from 'dayjs';
import type { Horario, HorDayjs, HorString } from './useScheduleTypes';

export const convertStringToDayJs = (
  horario: Horario & HorString
): Horario & HorDayjs => {
  const baseReturn = {
    ...horario,
    data: useDayJs()(horario.data),
    horaInicio: useDayJs()(`${horario.data} ${horario.horaInicio}`),
    horaFim: useDayJs()(`${horario.data} ${horario.horaFim}`),
  } as Horario & HorDayjs;

  if (horario.tipo === 'transicaoDia') {
    return {
      ...baseReturn,
      dataFim: useDayJs()(horario.dataFim),
    } as Horario & HorDayjs;
  }

  return baseReturn;
};

export const convertDayJsToString = (
  horario: Horario & HorDayjs
): Horario & HorString => {
  const baseReturn = {
    ...horario,
    data: horario.data!.format('YYYY-MM-DD'),
    horaInicio: horario.horaInicio.format('hh:mm'),
    horaFim: horario.horaFim.format('hh:mm'),
  } as Horario & HorString;

  if (horario.tipo === 'transicaoDia') {
    return {
      ...baseReturn,
      dataFim: (horario.dataFim as Dayjs).format('YYYY-MM-DD'),
    } as Horario & HorString;
  }

  return baseReturn;
};
