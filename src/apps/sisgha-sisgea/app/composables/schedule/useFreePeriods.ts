import type { Aula, HorString, TimeSlots, Vago } from './useScheduleTypes';

/**
 * Adiciona tempos vagos no horário a partir de um array de tempos de aula e um array de aulas.
 */
export const useFreePeriods = (
  temposDeAula: TimeSlots,
  aulas: (Aula & HorString)[]
): ((Aula | Vago) & HorString)[] => {
  const aulasEVagos = temposDeAula.entries().flatMap(([dia, temposDeAulaArr]) =>
    temposDeAulaArr.map(tempoDeAula => {
      const aula = aulas.find(
        aula =>
          aula.endHour === tempoDeAula.endHour && aula.weekday === dia.weekday
      );

      return aula !== undefined
        ? ({
            ...(aula as Aula & HorString),
            ...tempoDeAula,
          } as Aula & HorString)
        : ({
            id: crypto.randomUUID(),
            type: 'vago',
            ...tempoDeAula,
            weekday: dia.weekday,
            date: dia.date,
          } as Vago & HorString);
    })
  );

  return [...aulasEVagos];
};
