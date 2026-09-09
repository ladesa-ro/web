import { useField } from 'vee-validate';
import { computed, watch } from 'vue';

export function useFormField<T>(
  name: string,
  model: any,
  validateFn?: (val: T) => string | boolean
) {
  const { value, errorMessage, handleBlur } = useField<T>(name, validateFn, {
    syncVModel: false,
    initialValue: unref(model),
  });

  const fieldValue = computed({
    get: () => value.value,
    set: (val: T) => {
      value.value = val;
      model.value = val;
    },
  });

  watch(model, (val: T) => {
    if (val !== value.value) {
      value.value = val;
    }
  });

  return { fieldValue, errorMessage, handleBlur };
}
