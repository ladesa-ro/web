import type { ShiftName, WeekSchedule } from '../useScheduleTypes';
import type { Cell } from './useScheduleEditTypes';

const selectedCells = ref(new Set<ActiveCell>());

const selectedCellsIds = ref(new Set<string>());

export type ActiveCell = {
  id: string;
  date: string;
  weekday: string;
  dayIndex: number;
  shiftIndex: number;
  cellIndex: number;
};

// params

type ActionRemoveAll = { action: 'removeAll' };

type ActionGetAll = {
  action: 'getAll';
  get: 'ids' | 'cells';
};

type ActionAddOrRemoveOne = {
  action: 'addOne' | 'removeOne';
  cell: ActiveCell;
};

type Action = ActionRemoveAll | ActionGetAll | ActionAddOrRemoveOne;

// function overloads

export function useSelectedCells(params: ActionRemoveAll): void;

export function useSelectedCells(params: ActionAddOrRemoveOne): void;

export function useSelectedCells(
  params: ActionGetAll & { get: 'cells' }
): Ref<Set<ActiveCell>>;

export function useSelectedCells(
  params: ActionGetAll & { get: 'ids' }
): Ref<Set<string>>;

//

export function useSelectedCells(params: Action) {
  switch (params.action) {
    case 'getAll':
      return params.get === 'cells' ? selectedCells : selectedCellsIds;

    case 'removeAll':
      selectedCells.value.clear();
      selectedCellsIds.value.clear();
      break;

    case 'addOne':
      selectedCells.value.add(params.cell);
      selectedCellsIds.value.add(params.cell.id);
      break;

    case 'removeOne':
      selectedCells.value.forEach(cell =>
        cell.id === params.cell.id ? selectedCells.value.delete(cell) : cell
      );

      selectedCellsIds.value.delete(params.cell.id);
      break;
  }
}

// TODO: importar isso da função que calcula isso com base nos tempos de aula
const shiftNames: ShiftName[] = ['morning', 'afternoon', 'night'];

export const getActiveCellInfo = (
  weekSchedule: WeekSchedule,
  activeCell: ActiveCell
): { cell: Cell; shift: Cell[]; shiftName: ShiftName } | null => {
  const day = weekSchedule[activeCell.date];

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

  return { cell, shift, shiftName };
};
