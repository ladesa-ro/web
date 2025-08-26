export type Dias = { [key: string]: Horario[] | DiaEmTurnos};

import type { DiaEmTurnos, Horario, HorDayjs } from "./useScheduleTypes";

/**
 * A partir de um array com elementos do tipo `TransicaoDia`, dividido em turnos ou não, cria um objeto do tipo `Dias`.
 * @param horarioCompleto Array com horários do tipo `TransicaoDia`.
 * @returns Um array do tipo `Horario`, caso o parâmetro `horarioCompleto` não tenha sido dividido em transições de dia, ou, caso contrário, um objeto do tipo `Dias`. Cada chave deste objeto é uma data no formato `YYYY-MM-DD` e o valor é um array dos horários correspondentes a essa data.
 */
export const useSeparateScheduleInDays = (horarioCompleto: Horario[]) => {
  const idxTransicoes = horarioCompleto
    .map((horario, index) => (horario.tipo === "transicaoDia" ? index : null))
    .filter((item) => item !== null);

  if (idxTransicoes.length === 0) {
    // se não foram identificadas transições de dia anteriormente, retorna-se o próprio horário sem dividi-lo em arrays
    return horarioCompleto;
  }

  //

  const getKey = (dia: Horario & HorDayjs): string =>
    (dia as Horario & HorDayjs).data.format("YYYY-MM-DD");

  const dias: Dias = {};

  let i = 0;

  dias[getKey(horarioCompleto[0] as Horario & HorDayjs)] =
    horarioCompleto.slice(0, idxTransicoes[i]);

  for (i; i < idxTransicoes.length - 1; i++) {
    dias[
      getKey(horarioCompleto[idxTransicoes[i]! + 1] as Horario & HorDayjs)
    ] = horarioCompleto.slice(idxTransicoes[i]! + 1, idxTransicoes[i + 1]);
  }

  dias[
    getKey(horarioCompleto[idxTransicoes[i]! + 1] as Horario & HorDayjs)
  ] = horarioCompleto.slice(idxTransicoes[i]! + 1);

  return dias;
};
