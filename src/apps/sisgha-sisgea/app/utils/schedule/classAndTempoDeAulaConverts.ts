import { getWeekDays } from '~/utils/get-week-days';
import type { Aula, HorString, TimeSlotObj, TimeSlots } from './types';

export const addWeekDayToClass = (
  aula: Omit<Aula & HorString, 'weekday' | 'id'>
): Aula & HorString => {
  const weekday = useFilterText(useDayJs()(aula.date).format('dddd'));

  return {
    ...aula,
    id: `${aula.date}::${aula.startHour}::${aula.diario.professor}-${aula.diario.turma}`,
    weekday,
  };
};

export const addDayMonthToTempoDeAula = (
  aula: Aula & HorString,
  temposDeAula: TimeSlotObj
): TimeSlots => {
  const temposAulaMap: TimeSlots = new Map();

  const weekDays = getWeekDays(useDayJs()(aula.date));

  Object.entries(temposDeAula).forEach(([weekday, schedule], index) => {
    temposAulaMap.set(
      {
        date: weekDays[index]?.dayAsDayJs.format('YYYY-MM-DD') ?? '',
        weekday,
      },
      schedule
    );
  });

  return temposAulaMap;
};
