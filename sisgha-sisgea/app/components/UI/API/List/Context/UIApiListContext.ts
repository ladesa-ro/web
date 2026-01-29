import type {
  IGenericCrudModule,
  IGenericCrudModuleTypesBase,
} from '../../../../../utils';

const SYMBOL_EMPTY = Symbol.for('empty');
const STORE_KEY = 'UI_API_LIST_CONTEXT';

export enum UIApiListViewMode {
  CARDS,
}

export type UIApiListContext = ReturnType<typeof createUIApiListContext>;

export type ICreateUIApiListContextOptions<
  Typings extends IGenericCrudModuleTypesBase,
  CrudModule extends IGenericCrudModule<Typings>,
> = {
  crudModule: CrudModule;
  filter?: ComputedRef<Typings['List']['Queries']>;
};

export const createApiListContextOptions = <
  Typings extends IGenericCrudModuleTypesBase,
  CrudModule extends IGenericCrudModule<Typings>,
  Options extends ICreateUIApiListContextOptions<Typings, CrudModule>,
>(
  options: Options
) => options;

export const createUIApiListContext = <
  Typings extends IGenericCrudModuleTypesBase,
  CrudModule extends IGenericCrudModule<Typings>,
>(
  options: ICreateUIApiListContextOptions<Typings, CrudModule>
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

export const setupUIApiListContext = <
  Typings extends IGenericCrudModuleTypesBase,
  CrudModule extends IGenericCrudModule<Typings>,
>(
  options: ICreateUIApiListContextOptions<Typings, CrudModule>
) => {
  const apiListContext = createUIApiListContext(options);
  provide(STORE_KEY, apiListContext);
  return apiListContext;
};
