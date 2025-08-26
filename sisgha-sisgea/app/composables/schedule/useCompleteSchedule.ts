import { aulasSemDiaSemanaExemplo, temposDeAulaExemplo } from './EXEMPLO';
import {
  useClassDayWeek,
  useTempoDeAulaDayMonth,
} from './useClassAndTempoDeAulaConverts';
import { useFreePeriods } from './useFreePeriods';
import { useNonTeachingPeriods } from './useNonTeachingPeriods';
import type { Horario, HorDayjs } from './useScheduleTypes';
import {
  useSeparateScheduleInDays,
  type Dias,
} from './useSeparateScheduleInDays';
import { useSeparateScheduleInShifts } from './useSeparateScheduleInShifts';

/**
 * Retorna o horário completo com aulas ordenadas, horas vagas, intervalos, quebras de turno e quebras de dia.
 */
export const useHorarioCompleto = () => {
  const aulas = aulasSemDiaSemanaExemplo.map(aula => useClassDayWeek(aula));

  const temposDeAulaMap = useTempoDeAulaDayMonth(
    aulas[0]!,
    temposDeAulaExemplo
  );

  const aulasEVagos = useFreePeriods(temposDeAulaMap, aulas);

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

  return horarioDiasETurnos;

  // TODO: fazer conversões de acordo com os parâmetros
};
