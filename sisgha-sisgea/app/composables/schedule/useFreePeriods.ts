import type {
  Aula,
  HorString,
  TempoDeAula,
  TemposDeAula,
  Vago,
} from './useScheduleTypes';

/**
 * Adiciona tempos vagos no horário a partir de um array de tempos de aula e um array de aulas.
 */
export const useFreePeriods = (
  temposDeAula: TemposDeAula,
  aulas: (Aula & HorString)[]
): ((Aula | Vago) & HorString)[] => {
  const aulasEVagos = Object.entries(temposDeAula).map(
    ([diaSemana, temposDeAulaArr]) => {
      let aula: (Aula & HorString) | null = null;

      let tempoAula: TempoDeAula | null = null;

      temposDeAulaArr.forEach(tempoDeAula => {
        aulas.forEach(horAula => {
          if (
            horAula.diaSemana === diaSemana &&
            horAula.horaInicio === tempoDeAula.horaInicio
          ) {
            aula = horAula;
            tempoAula = tempoDeAula;
          }
        });
      });

      return aula !== null && tempoAula !== null
        ? ({
            ...(aula as Aula & HorString),
            ...(tempoAula as TempoDeAula),
          } as Aula & HorString)
        : ({ tipo: 'vago', ...tempoAula! } as Vago & HorString);
    }
  );

  return aulasEVagos;
};
