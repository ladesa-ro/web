import {
  getActiveCellInfo,
  useSelectedCells,
} from '~/composables/schedule/edit/useSelectedScheduleCells';
import type { WeekSchedule } from '~/composables/schedule/useScheduleTypes';

export const swapCells = (weekSchedule: Ref<WeekSchedule>): boolean => {
  const activeCells = useSelectedCells({
    action: 'getAll',
    get: 'cells',
  });

  const activeArr = [...activeCells.value];

  if (activeArr.length !== 2) {
    console.warn('activeArr.length =', activeArr.length);
    return false;
  }

  const cellA = getActiveCellInfo(weekSchedule.value, activeArr[0]!);
  const cellB = getActiveCellInfo(weekSchedule.value, activeArr[1]!);

  if (cellA === null || cellB === null) {
    console.warn('cellA = ', cellA);
    console.warn('cellB = ', cellB);
    return false;
  }

  //

  const shiftA = cellA.shift;
  const shiftB = cellB.shift;

  const cellIndexA = cellA.cell.cellIndex;
  const cellIndexB = cellB.cell.cellIndex;

  if (cellIndexA === undefined || cellIndexB === undefined) {
    return false;
  }

  const shiftIndexA = cellA.cell.shiftIndex;
  const shiftIndexB = cellB.cell.shiftIndex;

  if (shiftIndexA === undefined || shiftIndexB === undefined) {
    console.warn('shiftIndexA = ', shiftIndexA);
    console.warn('shiftIndexB = ', shiftIndexB);
    return false;
  }

  //

  const tempA = { ...cellA.cell };
  const tempB = { ...cellB.cell };

  tempA.date = cellB.cell.date;
  tempA.dayIndex = cellB.cell.dayIndex;
  tempA.shiftIndex = cellB.cell.shiftIndex;
  tempA.startHour = cellB.cell.startHour;
  tempA.endHour = cellB.cell.endHour;

  tempB.date = cellA.cell.date;
  tempB.dayIndex = cellA.cell.dayIndex;
  tempB.shiftIndex = cellA.cell.shiftIndex;
  tempB.startHour = cellA.cell.startHour;
  tempB.endHour = cellA.cell.endHour;

  shiftA.shiftSchedule[cellIndexA] = tempB;
  shiftB.shiftSchedule[cellIndexB] = tempA;

  weekSchedule.value[cellA.cell.date.format('YYYY-MM-DD')]!.daySchedule[cellA.shiftName].shiftSchedule = [
    ...shiftA.shiftSchedule,
  ];

  weekSchedule.value[cellB.cell.date.format('YYYY-MM-DD')]!.daySchedule[cellB.shiftName].shiftSchedule = [
    ...shiftB.shiftSchedule,
  ];

  useSelectedCells({ action: 'removeAll' });

  return true;
};

export const canSwap = computed(
  () => useSelectedCells({ action: 'getAll', get: 'ids' })!.value.size === 2
);
