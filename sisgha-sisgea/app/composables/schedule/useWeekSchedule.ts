import {
  useClassDayWeek,
  useTempoDeAulaDayMonth,
} from './useClassAndTempoDeAulaConverts';
import { useFreePeriods } from './useFreePeriods';
import { useNonTeachingPeriods } from './useNonTeachingPeriods';
import type {
  Aula,
  Horario,
  HorDayjs,
  HorString,
  TemposDeAula,
  WeekSchedule,
} from './useScheduleTypes';
import {
  useSeparateScheduleInDays,
  type IdentifiedDays,
} from './useSeparateScheduleInDays';
import { useSeparateScheduleInShifts } from './useSeparateScheduleInShifts';

/**
 * Retorna o horário completo com aulas ordenadas, horas vagas, intervalos, quebras de turno e quebras de dia.
 */
export const useWeekSchedule = (
  temposDeAula: TemposDeAula,
  aulas: Omit<Aula & HorString, 'diaSemana' | 'id'>[],
  turnosEDias: boolean = true,
  mustBeDayjs: boolean = true
  // onlyAulas: boolean = false
  // TODO: completar implementação deste parâmetro
) => {
  const horarioAulas = aulas.map(aula => useClassDayWeek(aula));

  const temposDeAulaMap = useTempoDeAulaDayMonth(
    horarioAulas[0]!,
    temposDeAula
  );

  const aulasEVagos = useFreePeriods(temposDeAulaMap, horarioAulas);

  const aulasVagosEForaDoHorario = useNonTeachingPeriods(aulasEVagos);

  const aulasSeparadasDias: Horario[] | IdentifiedDays =
    useSeparateScheduleInDays(aulasVagosEForaDoHorario);

  //

  const horarioTemApenasUmDia = (
    horarioEmDias: Horario[] | IdentifiedDays
  ): horarioEmDias is Horario[] => Array.isArray(horarioEmDias);

  const horarioTemUmDia: boolean = horarioTemApenasUmDia(aulasSeparadasDias);

  console.log('aulasSeparadasDias = ', aulasSeparadasDias);

  const horarioDiasETurnos = horarioTemUmDia
    ? useSeparateScheduleInShifts(aulasSeparadasDias as (Horario & HorDayjs)[])
    : (() => {
        const horarioComMaisDeUmDia = new Map();

        for (const [dia, horarios] of aulasSeparadasDias.entries()) {
          horarioComMaisDeUmDia.set(
            dia,
            useSeparateScheduleInShifts(horarios as (Horario & HorDayjs)[])
          );
        }
        return horarioComMaisDeUmDia as WeekSchedule;
      })();

  // TODO: fazer conversão de apenas aulas de acordo com os parâmetros

  if (!mustBeDayjs) {
    // return returnAsString(
    //   aulasVagosEForaDoHorario,
    //   horarioDiasETurnos,
    //   turnosEDias,
    //   horarioTemUmDia
    // );
  }

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
