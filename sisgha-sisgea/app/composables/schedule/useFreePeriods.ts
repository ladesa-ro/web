import type {
  Aula,
  HorString,
  TemposDeAulaMap,
  Vago,
} from './useScheduleTypes';

/**
 * Adiciona tempos vagos no horário a partir de um array de tempos de aula e um array de aulas.
 */
export const useFreePeriods = (
  temposDeAula: TemposDeAulaMap,
  aulas: (Aula & HorString)[]
): ((Aula | Vago) & HorString)[] => {
  const aulasEVagos = temposDeAula.entries().flatMap(([dia, temposDeAulaArr]) =>
    temposDeAulaArr.map(tempoDeAula => {
      const aula = aulas.find(
        aula =>
          aula.horaFim === tempoDeAula.horaFim &&
          aula.diaSemana === dia.diaSemana
      );

      return aula !== undefined
        ? ({
            ...(aula as Aula & HorString),
            ...tempoDeAula,
          } as Aula & HorString)
        : ({
            tipo: 'vago',
            ...tempoDeAula,
            diaSemana: dia.diaSemana,
            data: dia.data,
          } as Vago & HorString);
    })
  );

  return [...aulasEVagos];
};
