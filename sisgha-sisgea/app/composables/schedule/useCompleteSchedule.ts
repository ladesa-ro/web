import { aulasSemDiaSemanaExemplo, temposDeAulaExemplo } from './EXEMPLO';
import { useClassDayWeek } from './useClassDayWeek';
import { useFreePeriods } from './useFreePeriods';
import { useNonTeachingPeriods } from './useNonTeachingPeriods';
import { convertDayJsToString } from './useScheduleConverts';

/**
 * Retorna o horário completo com aulas ordenadas, horas vagas, intervalos, quebras de turno e quebras de dia.
 */
export const useHorarioCompleto = () => {
  // add dia da semana nos horarios OK
  const aulas = aulasSemDiaSemanaExemplo.map(aula => useClassDayWeek(aula));

  // add aulas vagas OK
  const aulasEVagos = useFreePeriods(temposDeAulaExemplo, aulas);

  // add tempos fora do horario OK
  const aulasVagosEForaDoHorario = useNonTeachingPeriods(aulasEVagos);

  // testar e corrigir se necessário <=
  // return aulasVagosEForaDoHorario.map(horario => convertDayJsToString(horario));
  return aulasEVagos;

  // dividir em dias

  // dividir em turnos

  // fazer conversões de acordo com os parâmetros
};
