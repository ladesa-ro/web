import type {
  IGenericCrudModule,
  IGenericCrudModuleTypes,
} from '../../../../../utils';

const SYMBOL_EMPTY = Symbol.for('empty');
const STORE_KEY = 'UI_API_LIST_CONTEXT';

export enum UIApiListViewMode {
  CARDS,
}

export type UIApiListContext = ReturnType<typeof createUIApiListContext>;

export type ICreateUIApiListContextOptions<
  Typings extends IGenericCrudModuleTypes,
> = {
  crudModule: IGenericCrudModule<Typings>;
};

export const createApiListContextOptions = <
  Typings extends IGenericCrudModuleTypes,
  T extends ICreateUIApiListContextOptions<Typings>,
>(
  options: T
) => {
  return options;
};

export const createUIApiListContext = <Typings extends IGenericCrudModuleTypes>(
  options: ICreateUIApiListContextOptions<Typings>
) => {
  const viewMode = ref(UIApiListViewMode.CARDS);

  const formOptions = reactive({
    search: '',
    limit: 3 * 6,
  });

  return {
    options,
    viewMode,
    formOptions,
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

export const setupUIApiListContext = <Typings extends IGenericCrudModuleTypes>(
  options: ICreateUIApiListContextOptions<Typings>
) => {
  const apiListContext = createUIApiListContext(options);
  provide(STORE_KEY, apiListContext);
  return apiListContext;
};
