import {
  addDayMonthToTempoDeAula,
  addWeekDayToClass,
} from '~/utils/schedule/classAndTempoDeAulaConverts';
import { getFreePeriods } from '~/utils/schedule/freePeriods';
import { getNonTeachingPeriods } from '~/utils/schedule/nonTeachingPeriods';
import {
  separateScheduleInDays,
  type ScheduleInDaysWithoutShifts,
} from '~/utils/schedule/separateScheduleInDays';
import { separateScheduleInShifts } from '~/utils/schedule/separateScheduleInShifts';
import type {
  Aula,
  DayInShiftsWithoutInfo,
  Horario,
  HorDayjs,
  HorString,
  TimeSlotObj,
  TimeSlots,
  Vago,
  WeekScheduleWhithoutInfo,
} from '~/utils/schedule/types';

export const useWeekSchedule = (
  temposDeAula: TimeSlotObj,
  aulas: Omit<Aula & HorString, 'weekday' | 'id'>[],
  turnosEDias: boolean = true,
  _mustBeDayjs: boolean = true
) => {
  const classes: (Aula & HorString)[] = aulas.map(aula =>
    addWeekDayToClass(aula)
  );

  const timeSlotsWithMonthDay: TimeSlots = addDayMonthToTempoDeAula(
    classes[0]!,
    temposDeAula
  );

  const aulasEVagos: ((Aula | Vago) & HorString)[] = getFreePeriods(
    timeSlotsWithMonthDay,
    classes
  );

  const aulasVagosEForaDoHorario: (Horario & HorDayjs)[] =
    getNonTeachingPeriods(aulasEVagos);

  const aulasSeparadasDias: Horario[] | ScheduleInDaysWithoutShifts =
    separateScheduleInDays(aulasVagosEForaDoHorario);

  const horarioTemApenasUmDia = (
    horarioEmDias: Horario[] | ScheduleInDaysWithoutShifts
  ): horarioEmDias is Horario[] => Array.isArray(horarioEmDias);

  const horarioTemUmDia: boolean = horarioTemApenasUmDia(aulasSeparadasDias);

  const horarioDiasETurnos: DayInShiftsWithoutInfo | WeekScheduleWhithoutInfo =
    horarioTemUmDia
      ? separateScheduleInShifts(aulasSeparadasDias as (Horario & HorDayjs)[])
      : Object.fromEntries(
          Object.entries(aulasSeparadasDias as ScheduleInDaysWithoutShifts).map(
            ([date, daySchedule]) => [
              date,
              separateScheduleInShifts(daySchedule),
            ]
          )
        );

  return turnosEDias ? horarioDiasETurnos : aulasVagosEForaDoHorario;
};
