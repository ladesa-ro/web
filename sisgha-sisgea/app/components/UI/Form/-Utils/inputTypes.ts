export type Item = string | number | { value: string | number; label: string };

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
};

//

export type TextFieldProps = FieldMeta & {
  type?: string;
};

export type SelectProps = FieldMeta & OptionFieldsItems;

export type AutocompleteProps = FieldMeta & OptionFieldsItems;
