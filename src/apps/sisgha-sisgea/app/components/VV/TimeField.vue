<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const {
  errorMessage,
  value: modelValue,
} = useField<string | null>(
  props.name,
  (inputValue) => {
    if (!props.required) return true;
    return !!inputValue;
  },
  {
    validateOnValueUpdate: false,
  },
);
</script>

<template>
  <UIFormTimeField
    v-model="modelValue"
    :label="props.label"
    :disabled="props.disabled"
    :error="errorMessage"
  />
</template>
