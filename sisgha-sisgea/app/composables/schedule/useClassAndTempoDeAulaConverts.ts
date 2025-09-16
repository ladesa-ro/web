import { getWeekDays } from '../../components/Section/Horario/-Helpers/GetWeekDays';
import type {
  Aula,
  HorString,
  TimeSlotObj,
  TimeSlots,
} from './useScheduleTypes';

// TODO: aceitar um parâmetro do tipo Ladesa_ManagementService_Domain_Contracts_AulaFindOneOutput ao integrar à api

/** Adiciona o dia da semana de um horário à sua estrutura com base em sua date. */
export const useAddWeekDayToClass = (
  aula: Omit<Aula & HorString, 'weekday' | 'id'>
): Aula & HorString => {
  const weekday = useFilterText(useDayJs()(aula.date).format('dddd'));

  return {
    ...aula,
    id: `${aula.date}::${aula.startHour}::${aula.diario.professor}-${aula.diario.turma}`,
    weekday,
  };
};

/** Adiciona o dia do mês à estrutura de tempo de aulas com base na date e dia da semana de uma aula. */
export const useAddDayMonthToTempoDeAula = (
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
