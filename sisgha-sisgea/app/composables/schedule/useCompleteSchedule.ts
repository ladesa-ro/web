import { aulasSemDiaSemanaExemplo, temposDeAulaExemplo } from './EXEMPLO';
import {
  useClassDayWeek,
  useTempoDeAulaDayMonth,
} from './useClassAndTempoDeAulaConverts';
import { useFreePeriods } from './useFreePeriods';
import { useNonTeachingPeriods } from './useNonTeachingPeriods';
import { useSeparateScheduleInDays } from './useSeparateScheduleInDays';

/**
 * Retorna o horário completo com aulas ordenadas, horas vagas, intervalos, quebras de turno e quebras de dia.
 */
export const useHorarioCompleto = () => {
  // add dia da semana nos horarios OK
  const aulas = aulasSemDiaSemanaExemplo.map(aula => useClassDayWeek(aula));

  const temposDeAulaMap = useTempoDeAulaDayMonth(
    aulas[0]!,
    temposDeAulaExemplo
  );

  const aulasEVagos = useFreePeriods(temposDeAulaMap, aulas);

  const aulasVagosEForaDoHorario = useNonTeachingPeriods(aulasEVagos);

  const aulasSeparadasDias = useSeparateScheduleInDays(
    aulasVagosEForaDoHorario
  );

  return aulasSeparadasDias;

  // TODO: dividir em turnos

  // TODO: fazer conversões de acordo com os parâmetros
};
