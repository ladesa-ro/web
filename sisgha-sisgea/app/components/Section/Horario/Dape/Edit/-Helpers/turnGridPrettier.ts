import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import type {
  ShiftName,
  WeekSchedule,
} from '~/composables/schedule/useScheduleTypes';
import { shiftNames } from './getRowShiftName';

export function getEmptyShift(
  weekSchedule: WeekSchedule,
  dayIndex: number,
  shiftIndex: number
) {
  const shiftName: ShiftName = shiftNames[shiftIndex]!;

  const emptyShift: Cell[] = [];

  Object.values(weekSchedule).find(day => {
    const referenceShift: Cell[] = day.daySchedule[shiftName].shiftSchedule;

    if (referenceShift.length > 0) {
      emptyShift.push (...referenceShift);
      emptyShift.forEach(shift => {
        shift.id = crypto.randomUUID();
        shift.dayIndex = dayIndex;
        
        if (shift.type !== 'intervalo') {
          shift.type = 'vago';
        }
      });
    }
  });

  return emptyShift;
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
