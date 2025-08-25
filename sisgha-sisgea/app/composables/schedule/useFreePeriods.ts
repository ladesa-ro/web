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
) => {
  const aulasEVagos = Object.entries(temposDeAula).map(
    ([diaSemana, temposDeAulaArr]) =>
      temposDeAulaArr.map(tempoDeAula => {
        let tempoAula: TempoDeAula | null = null;
        let data: string = '';

        const aula: (Aula & HorString) | undefined = aulas.find(horAula => {
          tempoAula = tempoDeAula;
          data = horAula.data;

          return (
            horAula.diaSemana === diaSemana &&
            horAula.horaInicio === tempoDeAula.horaInicio
          );
        });

        return aula !== undefined && tempoAula !== null
          ? ({
              ...(aula as Aula & HorString),
              ...(tempoAula as TempoDeAula),
            } as Aula & HorString)
          : ({
              id: crypto.randomUUID(),
              tipo: 'vago',
              ...tempoAula!,
              diaSemana,
              data,
            } as Vago & HorString);
      })
  );

  return aulasEVagos;
};
