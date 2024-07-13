import type { IApiBaseResourceListRetriever } from '../../../../../integrations';

const SYMBOL_EMPTY = Symbol.for('empty');
const STORE_KEY = 'UI_API_LIST_CONTEXT';

export enum UIApiListViewMode {
  CARDS,
}

export type UIApiListContext = ReturnType<typeof createUIApiListContext>;

export type ICreateUIApiListContextOptions<ResultItemDto extends any = any> = {
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>;
  apiBaseResourceListRetriever: IApiBaseResourceListRetriever<ResultItemDto>;
};

export const createUIApiListContext = (
  options: ICreateUIApiListContextOptions
) => {
  const viewMode = ref(UIApiListViewMode.CARDS);

  const formOptions = reactive({
    search: '',
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

export const setupUIApiListContext = (
  options: ICreateUIApiListContextOptions
) => {
  const apiListContext = createUIApiListContext(options);
  provide(STORE_KEY, apiListContext);
  return apiListContext;
};
