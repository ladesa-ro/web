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

/**
  Retorna o horário completo com aulas ordenadas, horas vagas, intervalos, quebras de turno e quebras de dia.
 */
export const useWeekSchedule = (
  temposDeAula: TimeSlotObj,
  aulas: Omit<Aula & HorString, 'weekday' | 'id'>[],
  turnosEDias: boolean = true,
  mustBeDayjs: boolean = true
  // onlyAulas: boolean = false
  // TODO: completar implementação deste parâmetro filtrando o horario sem dias e turnos para ter apenas cells do tipo aula
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

  // ==========

  const horarioTemApenasUmDia = (
    horarioEmDias: Horario[] | ScheduleInDaysWithoutShifts
  ): horarioEmDias is Horario[] => Array.isArray(horarioEmDias);

  const horarioTemUmDia: boolean = horarioTemApenasUmDia(aulasSeparadasDias);

  // ==========

  const horarioDiasETurnos: DayInShiftsWithoutInfo | WeekScheduleWhithoutInfo =
    horarioTemUmDia
      ? separateScheduleInShifts(
          aulasSeparadasDias as (Horario & HorDayjs)[]
        )
      : Object.fromEntries(
          Object.entries(aulasSeparadasDias as ScheduleInDaysWithoutShifts).map(
            ([date, daySchedule]) => [
              date, // string
              separateScheduleInShifts(daySchedule), // DayInShiftsWithoutInfo
            ]
          )
        );

  // DayInShiftsWithoutInfo
  /*
  'data': {
    daySchedule: {
      morning: { shiftSchedule: [] },
      afternoon: { shiftSchedule: [] },
      night: { shiftSchedule: [] },
    },
  }
      */

  // TODO: fazer conversão de apenas aulas de acordo com os parâmetros

  // if (!mustBeDayjs) {
  // return returnAsString(
  //   aulasVagosEForaDoHorario,
  //   horarioDiasETurnos,
  //   turnosEDias,
  //   horarioTemUmDia
  // );
  // }

  return turnosEDias ? horarioDiasETurnos : aulasVagosEForaDoHorario;
};

// TODO: adaptar a função abaixo para a nova tipagem de IdentifiedDays

// What to do if the return must be with string values
// const returnAsString = (
//   horarioTemposSemAula: (Horario & HorDayjs)[],
//   horarioDiasETurnos: DiaEmTurnos | IdentifiedDays,
//   turnosEDias: boolean,
//   horarioTemUmDia: boolean
// ) => {
//   if (!turnosEDias) {
//     const horarioTemposSemAulaString = horarioTemposSemAula.map(horario =>
//       convertDayJsToString(horario)
//     );

//     return horarioTemposSemAulaString;
//   }

//   const horarioDiasETurnosString = horarioTemUmDia
//     ? Object.entries(horarioDiasETurnos as DiaEmTurnos).map(([_, turno]) =>
//         Object.values(turno).map(horario => convertDayJsToString(horario))
//       )
//     : Object.fromEntries(
//         Object.entries(horarioDiasETurnos as IdentifiedDays).map(
//           ([key, dia]) => [
//             key,
//             Object.fromEntries(
//               Object.entries(dia as DiaEmTurnos).map(([key, turno]) => [
//                 key,
//                 Object.entries(turno).map(([_, horario]) =>
//                   convertDayJsToString(horario)
//                 ),
//               ])
//             ),
//           ]
//         )
//       );

//   return horarioDiasETurnosString;
// };
