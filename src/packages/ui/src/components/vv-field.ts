import { useField } from 'vee-validate';
import { useFieldDisabled } from './form-context';

export type UseVVFieldOptions<T = unknown> = {
  name: string | (() => string);
  disabled?: boolean;
  required?: boolean;
  initialValue?: T;
  validateOnValueUpdate?: boolean;
};

export function useVVField<T = unknown>(options: UseVVFieldOptions<T>) {
  const fieldDisabled = useFieldDisabled(() => !!options.disabled);

  const {
    errorMessage,
    handleBlur,
    value: fieldValue,
  } = useField<T>(
    options.name,
    inputValue => {
      if (!options.required) return true;
      if (!inputValue) return false;
      return true;
    },
    {
      ...(options.initialValue !== undefined
        ? { initialValue: options.initialValue }
        : {}),
      validateOnValueUpdate: options.validateOnValueUpdate ?? false,
    }
  );

  return { fieldValue, errorMessage, fieldDisabled, handleBlur };
}
