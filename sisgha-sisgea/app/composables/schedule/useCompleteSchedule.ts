import { aulasSemDiaSemanaExemplo, temposDeAulaExemplo } from "./EXEMPLO"
import { useClassDayWeek } from "./useClassDayWeek";
import { useFreePeriods } from "./useFreePeriods"

/**
 * Retorna o horário completo com horas vagas, intervalos, quebras de turno e quebras de dia.
 */
export const useHorarioCompleto = () => {
  // add dia da semana nos horarios OK
  const aulas = aulasSemDiaSemanaExemplo.map(aula => useClassDayWeek(aula))

  // add aulas vagas OK
  const aulasEVagos = useFreePeriods(temposDeAulaExemplo, aulas);
  
  // testar <=
  return aulasEVagos;

  // ============================================

  // add tempos fora do horario

  // dividir em dias

  // dividir em turnos

  // fazer conversões de acordo com os parâmetros
}
