const SYMBOL_EMPTY = Symbol.for('empty');
const STORE_KEY = 'UI_API_LIST_CONTEXT';

export enum UIApiListViewMode {
  CARDS,
}

export type UIApiListContext = ReturnType<typeof createUIApiListContext>;

export const createUIApiListContext = () => {
  const viewMode = ref(UIApiListViewMode.CARDS);

  const searchBarText = ref('');

  return {
    viewMode,
    searchBarText,
  };
};

export const useUIApiListContext = (): UIApiListContext => {
  const apiListContext = inject<UIApiListContext | typeof SYMBOL_EMPTY>(
    STORE_KEY,
    SYMBOL_EMPTY
  );

  if (!apiListContext || apiListContext === SYMBOL_EMPTY) {
    throw new Error('Please call setupApiListContext().');
  }

  return apiListContext;
};

export const setupUIApiListContext = () => {
  const apiListContext = createUIApiListContext();
  provide(STORE_KEY, apiListContext);
  return apiListContext;
};
