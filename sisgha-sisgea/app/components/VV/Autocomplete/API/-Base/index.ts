/**
 * Simple interface for autocomplete data fetching.
 * Any object with `list` and `getOne` can be used.
 */
export type IAutocompleteCrudModule = {
  baseQueryKeys: readonly string[] | string[];
  list: (data?: any) => Promise<any>;
  getOne: (id: string) => Promise<any>;
};

export type IUIAutocompleteApiRetrieverOptions<Value = any> = {
  crudModule: IAutocompleteCrudModule;
  transformer: (item: any) => {
    label: string;
    value: Value;
  };
};

export const createUIAutocompleteApiRetrieverOptions = <
  Value extends any,
  T extends IUIAutocompleteApiRetrieverOptions<Value>,
>(
  options: T
) => options;
