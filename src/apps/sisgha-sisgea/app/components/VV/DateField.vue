<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}>();

const {
  errorMessage,
  handleBlur,
  value: modelValue,
} = useField<string>(
  () => props.name,
  inputValue => {
    if (!props.required) return true;
    if (!inputValue) return false;
    return true;
  },
  {
    validateOnValueUpdate: false,
  },
);
</script>

<template>
  <UIFormTextField
    v-model="modelValue"
    type="date"
    :error="errorMessage"
    :name="name"
    :label="label"
    :disabled="disabled"
    v-bind="$attrs"
    @blur="handleBlur"
  />
</template>
