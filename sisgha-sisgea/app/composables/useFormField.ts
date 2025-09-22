import { useField } from 'vee-validate';
import { watch } from 'vue';

export function useFormField<T>(name: string, model: any, validateFn?: (val: T) => string | boolean) {
  const { value: fieldValue, errorMessage, handleBlur } = useField<T>(name, validateFn);

  watch(model, val => (fieldValue.value = val));
  watch(fieldValue, val => (model.value = val));

  return { fieldValue, errorMessage, handleBlur };
}
