<script lang="ts" setup>
import FormTextField from './FormTextField.vue';
import { useVVField } from './vv-field';

export type VVDateFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
};

const props = defineProps<VVDateFieldProps>();

const {
  fieldValue: modelValue,
  errorMessage,
  fieldDisabled,
  handleBlur,
} = useVVField<string>({
  name: () => props.name,
  disabled: props.disabled,
  required: props.required,
});
</script>

<template>
  <FormTextField
    v-model="modelValue"
    type="date"
    :error="errorMessage"
    :name="name"
    :label="label"
    :disabled="fieldDisabled"
    v-bind="$attrs"
    @blur="handleBlur"
  />
</template>
