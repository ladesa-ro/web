import {
  useClassDayWeek,
  useTempoDeAulaDayMonth,
} from './useClassAndTempoDeAulaConverts';
import { useFreePeriods } from './useFreePeriods';
import { useNonTeachingPeriods } from './useNonTeachingPeriods';
import { convertDayJsToString } from './useScheduleConverts';
import type {
  Aula,
  DiaEmTurnos,
  Horario,
  HorDayjs,
  HorString,
  TemposDeAula,
} from './useScheduleTypes';
import {
  useSeparateScheduleInDays,
  type Dias,
} from './useSeparateScheduleInDays';
import { useSeparateScheduleInShifts } from './useSeparateScheduleInShifts';

/**
 * Retorna o horário completo com aulas ordenadas, horas vagas, intervalos, quebras de turno e quebras de dia.
 */
export const useHorarioCompleto = (
  temposDeAula: TemposDeAula,
  aulas: Omit<Aula & HorString, 'diaSemana' | 'id'>[], // | Aula & HorString
  turnosEDias: boolean = true,
  mustBeDayjs: boolean = true
  // onlyAulas: boolean = false TODO: completar implementação deste parâmetro
) => {

  // TODO: verificar se as aulas recebias como parametro sao do tipo Omit<Aula & HorString, 'diaSemana' | 'id'> ou do tipo Aula

  const horarioAulas = aulas.map(aula => useClassDayWeek(aula));

  const temposDeAulaMap = useTempoDeAulaDayMonth(
    horarioAulas[0]!,
    temposDeAula
  );

  const aulasEVagos = useFreePeriods(temposDeAulaMap, horarioAulas);

  const aulasVagosEForaDoHorario = useNonTeachingPeriods(aulasEVagos);

  const aulasSeparadasDias: Horario[] | Dias = useSeparateScheduleInDays(
    aulasVagosEForaDoHorario
  );

  const horarioTemApenasUmDia = (
    horarioEmDias: Horario[] | Dias
  ): horarioEmDias is Horario[] => Array.isArray(horarioEmDias);

  const horarioTemUmDia = horarioTemApenasUmDia(aulasSeparadasDias);

  const horarioDiasETurnos = horarioTemUmDia
    ? useSeparateScheduleInShifts(aulasSeparadasDias as (Horario & HorDayjs)[])
    : Object.fromEntries(
        Object.entries(aulasSeparadasDias).map(([key, dia]) => [
          key,
          useSeparateScheduleInShifts(dia as (Horario & HorDayjs)[]),
        ])
      );

  // TODO: fazer conversão de apenas aulas de acordo com os parâmetros
  
  if (!mustBeDayjs) {
    return returnAsString(
      aulasVagosEForaDoHorario,
      horarioDiasETurnos,
      turnosEDias,
      horarioTemUmDia
    );
  }

  return turnosEDias ? horarioDiasETurnos : aulasVagosEForaDoHorario;
};

// What to do if the return must be with string values
const returnAsString = (
  horarioTemposSemAula: (Horario & HorDayjs)[],
  horarioDiasETurnos: DiaEmTurnos | Dias,
  turnosEDias: boolean,
  horarioTemUmDia: boolean
) => {
  if (!turnosEDias) {
    const horarioTemposSemAulaString = horarioTemposSemAula.map(horario =>
      convertDayJsToString(horario)
    );

    return horarioTemposSemAulaString;
  }

  const horarioDiasETurnosString = horarioTemUmDia
    ? Object.entries(horarioDiasETurnos as DiaEmTurnos).map(([_, turno]) =>
        Object.values(turno).map(horario => convertDayJsToString(horario))
      )
    : Object.fromEntries(
        Object.entries(horarioDiasETurnos as Dias).map(([key, dia]) => [
          key,
          Object.fromEntries(
            Object.entries(dia as DiaEmTurnos).map(([key, turno]) => [
              key,
              Object.entries(turno).map(([_, horario]) =>
                convertDayJsToString(horario)
              ),
            ])
          ),
        ])
      );

  return horarioDiasETurnosString;
};
