<script lang="ts" setup>
import { useVVField } from './-Helpers/useVVField';
import type { TextFieldProps } from '../UI/Form/-Utils/inputTypes';

const props = defineProps<TextFieldProps & { required?: boolean }>();

const { fieldValue: modelValue, errorMessage, fieldDisabled, handleBlur } = useVVField({
  name: props.name,
  disabled: props.disabled,
  required: props.required,
  initialValue: props.value,
});
</script>

<template>
  <UIFormTextField
    v-model="modelValue"
    :type="props.type"
    :error="errorMessage"
    :name="props.name"
    v-bind="$attrs"
    :disabled="fieldDisabled"
    :label="props.label"
    :placeholder="props.placeholder"
    @blur="handleBlur"
  />
</template>
