import type {
  IGenericCrudModule,
  IGenericCrudModuleTypesBase,
} from '../../../../../utils';

export type IUIAutocompleteApiRetrieverOptions<
  Typings extends IGenericCrudModuleTypesBase,
  Value = any,
> = {
  crudModule: IGenericCrudModule<Typings>;

  transformer: (item: Typings['GetOne']['Result']) => {
    label: string;
    value: Value;
  };
};

export const createUIAutocompleteApiRetrieverOptions = <
  Typings extends IGenericCrudModuleTypesBase,
  Value extends any,
  T extends IUIAutocompleteApiRetrieverOptions<Typings, Value>,
>(
  options: T
) => options;
