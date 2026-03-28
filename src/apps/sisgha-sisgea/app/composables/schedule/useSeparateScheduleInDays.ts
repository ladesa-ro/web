import type { Horario, HorDayjs } from './useScheduleTypes';

export type ScheduleInDaysWithoutShifts = Record<
  string,
  (Horario & HorDayjs)[]
>;

/**
 * A partir de um array com elementos do tipo `TransicaoDia`, dividido em turnos ou não, cria um objeto do tipo `Dias`.
 * @param horarioCompleto Array com horários do tipo `TransicaoDia`.
 * @returns Um array do tipo `Horario`, caso o parâmetro `horarioCompleto` não tenha sido dividido em transições de dia, ou, caso contrário, um objeto do tipo `Dias`. Cada chave deste objeto é uma data no formato `YYYY-MM-DD` e o valor é um array dos horários correspondentes a essa data.
 */
export const useSeparateScheduleInDays = (
  horarioCompleto: (Horario & HorDayjs)[]
): Horario[] | ScheduleInDaysWithoutShifts => {
  const idxTransicoes = horarioCompleto
    .map((horario, index) => (horario.type === 'transicaoDia' ? index : null))
    .filter(item => item !== null);

  if (idxTransicoes.length === 0) {
    // se não foram identificadas transições de dia anteriormente, retorna-se o próprio horário sem dividi-lo em arrays
    return horarioCompleto;
  }

  //

  const getKey = (dia: Horario & HorDayjs): string =>
    dia.date.format('YYYY-MM-DD');

  const days: ScheduleInDaysWithoutShifts = {};

  let i = 0;

  days[getKey(horarioCompleto[0]!)] = horarioCompleto.slice(
    0,
    idxTransicoes[i]
  );

  for (i; i < idxTransicoes.length - 1; i++) {
    days[getKey(horarioCompleto[idxTransicoes[i]! + 1]!)] =
      horarioCompleto.slice(idxTransicoes[i]! + 1, idxTransicoes[i + 1]);
  }

  days[getKey(horarioCompleto[idxTransicoes[i]! + 1]!)] = horarioCompleto.slice(
    idxTransicoes[i]! + 1
  );

  return days;
};
