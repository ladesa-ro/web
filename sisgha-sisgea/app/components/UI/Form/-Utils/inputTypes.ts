type Option = Record<string, any>;

type SelectAndAutocompleteOptions = {
  /**
   * Specify the options by offering an array of objects
   */
  options: Option[];

  /**
   * Specify the object property that will define the name for each option
   */
  optionTitle: string;
};

//

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

type FieldMeta = {
  placeholder?: string;
  label?: string;
};

//

export type TextFieldProps = FieldMeta & {
  type?: 'text' | 'number' | 'password';
};

export type SelectProps = FieldMeta & SelectAndAutocompleteOptions;

export type AutocompleteProps = FieldMeta & SelectAndAutocompleteOptions;
