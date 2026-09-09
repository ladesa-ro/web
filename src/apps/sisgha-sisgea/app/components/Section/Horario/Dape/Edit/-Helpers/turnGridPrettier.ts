import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import type { ShiftName, WeekSchedule } from '~/utils/schedule/types';

export function getEmptyShift(
  weekSchedule: WeekSchedule,
  dayDate: string,
  dayIndex: number,
  shiftName: ShiftName
) {
  const baseShift: Cell[] =
    Object.values(weekSchedule)
      .flatMap(day => day.daySchedule[shiftName])
      .find(shift => shift.shiftSchedule.length > 0)?.shiftSchedule ?? [];

  baseShift.forEach(cell => {
    cell.id = crypto.randomUUID();
    cell.dayIndex = dayIndex;
    cell.dayDate = dayDate;

    if (cell.type !== 'intervalo') {
      cell.type = 'vago';
    }
  });

  return baseShift;
}

export type HoursPerShift = {
  morning: Set<string>;
  afternoon: Set<string>;
  night: Set<string>;
};

export function getAllStartHours(weekSchedule: WeekSchedule): HoursPerShift {
  const hours: HoursPerShift = {
    morning: new Set<string>(),
    afternoon: new Set<string>(),
    night: new Set<string>(),
  };

  Object.values(weekSchedule)
    .flatMap(day => Object.entries(day.daySchedule))
    .forEach(([shiftName, shift]) => {
      shift.shiftSchedule.forEach(cell =>
        hours[shiftName as ShiftName].add(
          `${useDayJs()(cell.startHour).format('HH:mm')}${cell.type === 'intervalo' ? ' intervalo' : ''}`
        )
      );
    });

  return hours;
}
