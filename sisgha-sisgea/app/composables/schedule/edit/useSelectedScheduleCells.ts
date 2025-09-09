const selectedCells = ref(new Set<Cell>());

const selectedCellsIds = ref(new Set<string>());

type Cell = {
  id: string;
  shiftId: string;
  dayId: string;
};

// params

type ActionRemoveAll = { action: 'removeAll' };

type ActionGetAll = {
  action: 'getAll';
  get: 'ids' | 'cells';
};

type ActionAddOrRemoveOne = {
  action: 'addOne' | 'removeOne';
  cell: Cell;
};

type Action = ActionRemoveAll | ActionGetAll | ActionAddOrRemoveOne;

// function overloads

export function useSelectedCells(params: ActionRemoveAll): void;

export function useSelectedCells(params: ActionAddOrRemoveOne): void;

export function useSelectedCells(
  params: ActionGetAll & { get: 'cells' }
): Ref<Set<Cell>>;

export function useSelectedCells(
  params: ActionGetAll & { get: 'ids' }
): Ref<Set<string>>;

//

export function useSelectedCells(params: Action) {
  switch (params.action) {
    case 'getAll':
      return params.get === 'cells'
        ? selectedCells
        : selectedCellsIds;

    case 'removeAll':
      selectedCells.value.clear();
      selectedCellsIds.value.clear();
      break;

    case 'addOne':
      selectedCells.value.add(params.cell);
      selectedCellsIds.value.add(params.cell.id);
      break;

    case 'removeOne':
      selectedCells.value.delete(params.cell);
      selectedCellsIds.value.delete(params.cell.id);
      break;
  }
}
