import type { OptionItem, ParsedOptionItem } from './option-item';

type OptionFieldsItems = { items: OptionItem[] };

//

type InputTypeTextField = { type: 'textfield' };

type InputTypeSelect = { type: 'select' } & OptionFieldsItems;

type InputTypeAutocomplete = {
  type: 'autocomplete';
} & OptionFieldsItems;

export type FormInputTypes = InputTypeTextField | InputTypeSelect | InputTypeAutocomplete;

//

type FieldMeta = {
  placeholder?: string;
  label?: string;
  disabled?: boolean;
};

//

export type FormTextFieldProps = FieldMeta & {
  type?: string;
  name: string;
  value?: string | number;
  mask?: string;
};

export type FormSelectProps = FieldMeta &
  OptionFieldsItems & { items: ParsedOptionItem[]; multipleOptions?: boolean };

export type FormAutocompleteProps = FieldMeta & OptionFieldsItems;
