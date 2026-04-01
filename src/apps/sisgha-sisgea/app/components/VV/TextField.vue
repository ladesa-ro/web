<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { TextFieldProps } from '../UI/Form/-Utils/inputTypes';

const props = defineProps<TextFieldProps & { required?: boolean }>();

const {
  errorMessage,
  handleBlur,
  value: modelValue,
} = useField(
  props.name,
  inputValue => {
    if (!props.required) {
      return true;
    }

    if (!inputValue) {
      return false;
    }

    return true;
  },
  {
    initialValue: props.value ?? undefined,
    validateOnValueUpdate: false,
  }
);
</script>

<template>
  <UIFormTextField
    v-model="modelValue"
    :type="props.type"
    :error="errorMessage"
    :name="props.name"
    v-bind="$attrs"
    :label="props.label"
    :placeholder="props.placeholder"
    @blur="handleBlur"
  />
</template>
