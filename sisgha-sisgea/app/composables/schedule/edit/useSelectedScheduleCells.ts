const selectedCells = ref(new Set<string>());

type FnParamsOnlyAction = {
  action: 'getAll' | 'removeAll';
};

type FnParamsObrigatoryId = {
  action: 'addOne' | 'removeOne';
  id: string;
};

export const useSelectedCells = (
  params: FnParamsOnlyAction | FnParamsObrigatoryId
) => {
  switch (params.action) {
    case 'getAll':
      return selectedCells;

    case 'removeAll':
      selectedCells.value.clear();
      break;

    case 'addOne':
      selectedCells.value.add((params as FnParamsObrigatoryId).id);
      break;

    case 'removeOne':
      selectedCells.value.delete((params as FnParamsObrigatoryId).id);
      break;
  }
};
