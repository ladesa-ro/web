const SYMBOL_EMPTY = Symbol.for('empty');
const STORE_KEY = 'UI_API_LIST_CONTEXT';

export enum UIApiListViewMode {
  CARDS,
}

export type UIApiListContext = ReturnType<typeof createUIApiListContext>;

/**
 * Simple interface for entity listing.
 * Any object with `list` and `baseQueryKeys` can be used.
 */
export type IEntityListModule = {
  baseQueryKeys: readonly string[] | string[];
  list: (data?: any, contextCampi?: any) => Promise<any>;
  getOne?: (id: string) => Promise<any>;
};

export type ICreateUIApiListContextOptions = {
  crudModule: IEntityListModule;
  filter?: ComputedRef<any> | any;
  gridClass?: string;
};

export const createApiListContextOptions = (
  options: ICreateUIApiListContextOptions
) => options;

export const createUIApiListContext = (
  options: ICreateUIApiListContextOptions
) => {
  const viewMode = ref(UIApiListViewMode.CARDS);

  const filters = computed(() => {
    return JSON.parse(JSON.stringify(unref(options.filter) ?? {}));
  });

  const formOptions = ref({
    search: '',
    limit: 3 * 6,
  });

  const formWithFilters = computed(() => {
    return {
      ...formOptions.value,
      ...filters.value,
    };
  });

  return {
    options,
    viewMode,
    formOptions,
    formWithFilters,
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

export const setupUIApiListContext = (
  options: ICreateUIApiListContextOptions
) => {
  const apiListContext = createUIApiListContext(options);
  provide(STORE_KEY, apiListContext);
  return apiListContext;
};
