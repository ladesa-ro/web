import type {
  DayInShiftsWithoutInfo,
  Horario,
  HorDayjs,
} from './useScheduleTypes';

/**
 * Divide o horário de um dia de aula em turnos.
 * @param horarioDoDia Horário de um dia completo.
 * */
export const useSeparateScheduleInShifts = (
  horarioDoDia: (Horario & HorDayjs)[]
): DayInShiftsWithoutInfo => {
  // utilizado para definir horários de início e endHour dos turnos em dayjs
  const defineHour = (index: number, hour: string) =>
    useDayJs()(`${horarioDoDia[index]?.date.format('YYYY-MM-DD')} ${hour}`);

  // TODO: adicionar aqui apenas os períodos calculados em time slot
  const diaEmTurnos: DayInShiftsWithoutInfo = {
    daySchedule: {
      morning: { shiftSchedule: [] },
      afternoon: { shiftSchedule: [] },
      night: { shiftSchedule: [] },
    },
  };

  horarioDoDia.forEach((cell, index) => {
    const shiftLimits = {
      morning: {
        startHour: defineHour(index, '04:00'),
        endHour: defineHour(index, '12:00'),
      },
      afternoon: {
        startHour: defineHour(index, '12:00'),
        endHour: defineHour(index, '18:00'),
      },
      night: {
        startHour: defineHour(index, '18:00'),
        endHour: defineHour(index, '23:59'),
      },
    };

    // divisão de turnos
    if (cell.type === 'quebraTurno' || cell.type === 'transicaoDia') {
      return;
    }

    if (
      cell.startHour.isBetween(
        shiftLimits.morning.startHour,
        shiftLimits.morning.endHour,
        'hour'
      )
    ) {
      diaEmTurnos.daySchedule.morning.shiftSchedule.push(cell);
    }

    //
    else if (
      cell.startHour.isBetween(
        shiftLimits.afternoon.startHour,
        shiftLimits.afternoon.endHour,
        'hour'
      )
    ) {
      diaEmTurnos.daySchedule.afternoon.shiftSchedule.push(cell);
    }

    //
    else if (
      cell.startHour.isBetween(
        shiftLimits.night.startHour,
        shiftLimits.night.endHour,
        'hour'
      )
    ) {
      diaEmTurnos.daySchedule.night.shiftSchedule.push(cell);
    }
  });

  return diaEmTurnos;
};
