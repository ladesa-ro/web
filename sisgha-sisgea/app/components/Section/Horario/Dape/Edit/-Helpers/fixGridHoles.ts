import type { WeekSchedule } from '~/composables/schedule/useScheduleTypes';
import { getRowShiftName } from './getRowShiftName';

// TODO: implementar essa funcao
export function getAllShifts(weekSchedule: WeekSchedule) {
  const shifts = new Set<string>();

  return shifts;
}

export function getAllStartHours(weekSchedule: WeekSchedule): Set<string> {
  let startHours = new Set<string>();

  Object.values(weekSchedule).forEach(day => {
    Object.values(day.daySchedule).forEach(shift => {
      shift.shiftSchedule.forEach(cell => {
        startHours.add(
          `${useDayJs()(cell.startHour).format('HH:mm')}${cell.type === 'intervalo' ? ' intervalo' : ''} shiftIndex=${cell.shiftIndex}`
        );
      });
    });
  });

  const startHoursArray = [...startHours];

  startHoursArray.sort((a, b) => {
    const dateA = new Date(`2000/01/01 ${a}`);
    const dateB = new Date(`2000/01/01 ${b}`);

    return dateA.getTime() - dateB.getTime();
  });

  startHours = new Set(startHoursArray);

  return startHours;
}
