import { type Item, type ParsedItem } from '~/composables/useOptionItems';

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

export type SelectProps = FieldMeta &
  OptionFieldsItems & { items: ParsedItem[]; multipleOptions?: boolean };

export type AutocompleteProps = FieldMeta & OptionFieldsItems;
