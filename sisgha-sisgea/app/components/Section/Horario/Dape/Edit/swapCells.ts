import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import {
  useSelectedCells,
  type ActiveCell,
} from '~/composables/schedule/edit/useSelectedScheduleCells';
import type {
  ShiftName,
  WeekSchedule,
} from '~/composables/schedule/useScheduleTypes';

export const swapCells = (weekSchedule: Ref<WeekSchedule>) => {
  const activeCells = useSelectedCells({
    action: 'getAll',
    get: 'cells',
  });

  const activeArr = [...activeCells.value];

  if (activeArr.length !== 2) {
    console.warn('activeArr.length =', activeArr.length);
    return;
  }

  // TODO: importar isso da função que calcula isso com base nos tempos de aula
  const shiftNames: ShiftName[] = ['morning', 'afternoon', 'night'];

  const getActiveCellInfo = (
    activeCell: ActiveCell
  ): { cell: Cell; shift: Cell[] } | null => {
    const day = weekSchedule.value[activeCell.date];

    const shiftName = shiftNames[activeCell.shiftIndex];

    if (!day || !shiftName) {
      console.warn('day = ', day);
      console.warn('shiftName = ', shiftName);
      return null;
    }

    const shift = day[shiftName];

    const cell = shift.find(cell => cell.id === activeCell.id);

    if (!cell) {
      console.warn('cell =', JSON.stringify(cell));
      return null;
    }

    cell.cellIndex = activeCell.cellIndex;

    return { cell, shift };
  };

  const cellA = getActiveCellInfo(activeArr[0]!);
  const cellB = getActiveCellInfo(activeArr[1]!);

  if (cellA === null || cellB === null) {
    console.warn('cellA = ', cellA);
    console.warn('cellB = ', cellB);
    return;
  }

  //

  const shiftA = cellA.shift;
  const shiftB = cellB.shift;

  const cellIndexA = cellA.cell.cellIndex;
  const cellIndexB = cellB.cell.cellIndex;

  if (cellIndexA === undefined || cellIndexB === undefined) {
    return;
  }

  const shiftIndexA = cellA.cell.shiftIndex;
  const shiftIndexB = cellB.cell.shiftIndex;

  if (shiftIndexA === undefined || shiftIndexB === undefined) {
    console.warn('shiftIndexA = ', shiftIndexA);
    console.warn('shiftIndexB = ', shiftIndexB);
    return;
  }

  //

  const swapAttrs = (attr: keyof Cell) => {
    [shiftA[cellIndexA]![attr] as any, shiftB[cellIndexB]![attr] as any] = [
      shiftB[cellIndexB]![attr],
      shiftA[cellIndexA]![attr],
    ];
  };

  // swap
  [shiftA[cellIndexA], shiftB[cellIndexB]] = [
    shiftB[cellIndexB]!,
    shiftA[cellIndexA]!,
  ];

  swapAttrs('shiftIndex');
  swapAttrs('startHour');
  swapAttrs('endHour');

  //
  if (cellA.cell.date !== cellB.cell.date) {
    swapAttrs('date');
    swapAttrs('dayIndex');
  }

  weekSchedule.value[cellA.cell.date.format('YYYY-MM-DD')]![
    shiftNames[shiftIndexA]!
  ] = shiftA;

  weekSchedule.value[cellB.cell.date.format('YYYY-MM-DD')]![
    shiftNames[shiftIndexB]!
  ] = shiftB;

  useSelectedCells({ action: 'removeAll' });
};

export const canSwap = computed(
  () => useSelectedCells({ action: 'getAll', get: 'ids' })!.value.size === 2
);
