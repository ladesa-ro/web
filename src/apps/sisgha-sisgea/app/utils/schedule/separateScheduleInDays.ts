import type { Horario, HorDayjs } from './types';

export type ScheduleInDaysWithoutShifts = Record<
  string,
  (Horario & HorDayjs)[]
>;

export const separateScheduleInDays = (
  horarioCompleto: (Horario & HorDayjs)[]
): Horario[] | ScheduleInDaysWithoutShifts => {
  const idxTransicoes = horarioCompleto
    .map((horario, index) => (horario.type === 'transicaoDia' ? index : null))
    .filter(item => item !== null);

  if (idxTransicoes.length === 0) {
    return horarioCompleto;
  }

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
