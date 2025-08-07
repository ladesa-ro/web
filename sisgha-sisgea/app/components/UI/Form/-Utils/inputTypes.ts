import { type Item } from "~/composables/useOptionItems";

type OptionFieldsItems = { items: Item[] };

//

type InputTypeTextField = { type: 'textfield' };

type InputTypeSelect = { type: 'select' } & OptionFieldsItems;

type InputTypeAutocomplete = {
  type: 'autocomplete';
} & OptionFieldsItems;

export type InputTypes =
  | InputTypeTextField
  | InputTypeSelect
  | InputTypeAutocomplete;

//

type FieldMeta = {
  placeholder?: string;
  label?: string;
  disabled?: boolean;
};

//

export type TextFieldProps = FieldMeta & {
  type?: string;
};

export type SelectProps = FieldMeta & OptionFieldsItems;

export type AutocompleteProps = FieldMeta & OptionFieldsItems;
