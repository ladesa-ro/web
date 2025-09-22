<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { TextFieldProps } from '../UI/Form/-Utils/inputTypes';

const props = defineProps<TextFieldProps>();

const {
  errorMessage,
  handleBlur,
  value: modelValue,
} = useField(props.name, undefined, {
  initialValue: props.value ?? undefined,
  validateOnValueUpdate: false,
});
</script>

<template>
  <UIFormTextField
    v-model="modelValue"
    :type="props.type"
    :error="errorMessage"
    :name="props.name"
    @blur="handleBlur"
    v-bind="$attrs"
    :label="props.label"
    :placeholder="props.placeholder"
  />
</template>
