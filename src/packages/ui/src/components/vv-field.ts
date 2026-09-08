import { useField } from 'vee-validate';
import { useFieldDisabled } from './form-context';

type MaybeGetter<T> = T | (() => T);

export type UseVVFieldOptions<T = unknown> = {
  name: string | (() => string);
  disabled?: MaybeGetter<boolean | undefined>;
  required?: MaybeGetter<boolean | undefined>;
  requiredMessage?: string;
  initialValue?: T;
  validateOnValueUpdate?: boolean;
};

const read = <T>(source: MaybeGetter<T>): T =>
  typeof source === 'function' ? (source as () => T)() : source;

export function useVVField<T = unknown>(options: UseVVFieldOptions<T>) {
  const fieldDisabled = useFieldDisabled(() => !!read(options.disabled));

  const {
    errorMessage,
    handleBlur,
    value: fieldValue,
  } = useField<T>(
    options.name,
    inputValue => {
      if (!read(options.required)) return true;
      if (!inputValue) return options.requiredMessage ?? false;
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
