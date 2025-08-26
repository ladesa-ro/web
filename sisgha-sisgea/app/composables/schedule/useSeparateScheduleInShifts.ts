import type { DiaEmTurnos, Horario, HorDayjs } from "./useScheduleTypes";

/**
 * Divide o horário de um dia de aula em turnos.
 * @param horarioDoDia Horário de um dia completo.
 * */
export const useSeparateScheduleInShifts = (
  horarioDoDia: (Horario & HorDayjs)[]
): DiaEmTurnos => {
  // utilizado para definir horários de início e fim dos turnos em dayjs
  const defineHour = (index: number, hour: string) =>
    useDayJs()(`${horarioDoDia[index]?.data.format("YYYY-MM-DD")} ${hour}`);

  const diaEmTurnos: DiaEmTurnos = { manha: [], tarde: [], noite: [] };

  horarioDoDia.forEach((horario, index) => {
    const horariosTurnos = {
      manha: {
        inicio: defineHour(index, "06:00"),
        fim: defineHour(index, "12:00"),
      },
      tarde: {
        inicio: defineHour(index, "12:00"),
        fim: defineHour(index, "18:00"),
      },
      noite: {
        inicio: defineHour(index, "18:00"),
        fim: defineHour(index, "23:59"),
      },
    };

    // divisão de turnos

    if (
      horario.tipo !== "quebraTurno" &&
      horario.tipo !== "transicaoDia"
    ) {
      if (
        horario.horaInicio.isBetween(
          horariosTurnos.manha.inicio,
          horariosTurnos.manha.fim,
          "hour"
        )
      ) {
        diaEmTurnos.manha.push(horario);
      }

      //
      else if (
        horario.horaInicio.isBetween(
          horariosTurnos.tarde.inicio,
          horariosTurnos.tarde.fim,
          "hour"
        )
      ) {
        diaEmTurnos.tarde.push(horario);
      }

      //
      else if (
        horario.horaInicio.isBetween(
          horariosTurnos.noite.inicio,
          horariosTurnos.noite.fim,
          "hour"
        )
      ) {
        diaEmTurnos.noite.push(horario);
      }
    }
  });

  return diaEmTurnos;
};
