import type {
  IGenericCrudModule,
  IGenericCrudModuleTypes,
} from '../../../../../utils';

export type IUIAutocompleteApiRetrieverOptions<
  Typings extends IGenericCrudModuleTypes,
  Value = any,
> = {
  crudModule: IGenericCrudModule<Typings>;

  transformer: (item: Typings['GetOne']['Result']) => {
    label: string;
    value: Value;
  };
};

export const createUIAutocompleteApiRetrieverOptions = <
  Typings extends IGenericCrudModuleTypes,
  Value extends any,
  T extends IUIAutocompleteApiRetrieverOptions<Typings, Value>,
>(
  options: T
) => options;
