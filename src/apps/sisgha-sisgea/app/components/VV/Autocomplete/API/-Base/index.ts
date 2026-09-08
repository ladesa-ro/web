import type { MaybeRef } from 'vue';

export type IAutocompleteCrudModule = {
  baseQueryKeys: MaybeRef<readonly string[] | string[]>;
  list: (data?: any, ...args: any[]) => Promise<any>;
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
