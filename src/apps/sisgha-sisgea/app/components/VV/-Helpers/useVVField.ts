import { useField } from 'vee-validate';

export type UseVVFieldOptions<T = any> = {
  name: string | (() => string);
  disabled?: boolean;
  required?: boolean;
  initialValue?: T;
  validateOnValueUpdate?: boolean;
};

/**
 * Encapsulates the common vee-validate field setup shared across VV field wrappers.
 *
 * Handles:
 * - `useField` with optional required validation
 * - `useFieldDisabled` merging prop + form context
 * - Error message and blur handler
 */
export function useVVField<T = any>(options: UseVVFieldOptions<T>) {
  const fieldDisabled = useFieldDisabled(() => !!options.disabled);

  const {
    errorMessage,
    handleBlur,
    value: fieldValue,
  } = useField<T>(
    typeof options.name === 'function' ? options.name : options.name,
    (inputValue) => {
      if (!options.required) return true;
      if (!inputValue) return false;
      return true;
    },
    {
      ...(options.initialValue !== undefined ? { initialValue: options.initialValue } : {}),
      validateOnValueUpdate: options.validateOnValueUpdate ?? false,
    },
  );

  return { fieldValue, errorMessage, fieldDisabled, handleBlur };
}
