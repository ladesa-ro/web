import {
  getActiveCellInfo,
  useSelectedCells,
} from '~/composables/schedule/edit/useSelectedScheduleCells';
import type { WeekSchedule } from '~/composables/schedule/useScheduleTypes';

export const replaceCell = (weekSchedule: Ref<WeekSchedule>): boolean => {
  const activeCells = useSelectedCells({
    action: 'getAll',
    get: 'cells',
  });

  const activeArr = [...activeCells.value];

  if (activeArr.length !== 2) return false;

  const cellA = getActiveCellInfo(weekSchedule.value, activeArr[0]!);
  const cellB = getActiveCellInfo(weekSchedule.value, activeArr[1]!);

  if (!cellA || !cellB) return false;

  const cellACopy = { ...cellA.cell };

  //

  const cellBIndex = cellB.cell.cellIndex!;
  const bDate = cellB.cell.date.format('YYYY-MM-DD');

  weekSchedule.value[bDate]!.daySchedule[cellB.shiftName].shiftSchedule[
    cellBIndex
  ] = {
    ...cellACopy,
    id: crypto.randomUUID?.() ?? cellACopy.id,
    date: cellB.cell.date,
    startHour: cellB.cell.startHour,
    endHour: cellB.cell.endHour,
    cellIndex: cellBIndex,
    shiftIndex: cellB.cell.shiftIndex,
    dayIndex: cellB.cell.dayIndex,
  };

  //

  const cellAIndex = cellA.cell.cellIndex!;
  const aDate = cellA.cell.date.format('YYYY-MM-DD');

  weekSchedule.value[aDate]!.daySchedule[cellA.shiftName].shiftSchedule[cellAIndex] = {
    type: 'vago',
    id: crypto.randomUUID?.() ?? `${cellACopy.id}-vago`,
    date: cellA.cell.date,
    startHour: cellA.cell.startHour,
    endHour: cellA.cell.endHour,
    weekday: cellA.cell.date.format('dddd'),
    cellIndex: cellAIndex,
    shiftIndex: cellA.cell.shiftIndex,
    dayIndex: cellA.cell.dayIndex,
  };

  useSelectedCells({ action: 'removeAll' });

  return true;
};
