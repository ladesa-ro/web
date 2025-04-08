export type FieldMeta = {
  placeholder?: string;
  label?: string;
};

//

type SelectAndAutocompleteOptions = {
  options: any[]; // TODO: especificar melhor a tipagem
};

type InputTypeTextField = { type: 'textfield' };
type InputTypeSelect = { type: 'select' } & SelectAndAutocompleteOptions;
type InputTypeAutocomplete = {
  type: 'autocomplete';
} & SelectAndAutocompleteOptions;

export type InputTypes =
  | InputTypeTextField
  | InputTypeSelect
  | InputTypeAutocomplete;

//

export type TextFieldProps = FieldMeta;

export type SelectProps = FieldMeta & SelectAndAutocompleteOptions;

export type AutocompleteProps = FieldMeta & SelectAndAutocompleteOptions;
