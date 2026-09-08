<script lang="ts" setup>
import FormTextField from './FormTextField.vue';
import type { FormTextFieldProps } from './form-input-types';
import { useVVField } from './vv-field';

export type VVTextFieldProps = FormTextFieldProps & { required?: boolean };

const props = defineProps<VVTextFieldProps>();

const {
  fieldValue: modelValue,
  errorMessage,
  fieldDisabled,
  handleBlur,
} = useVVField({
  name: () => props.name,
  disabled: () => props.disabled,
  required: () => props.required,
  initialValue: props.value,
});
</script>

<template>
  <FormTextField
    v-model="modelValue"
    :type="props.type"
    :error="errorMessage"
    :name="props.name"
    v-bind="$attrs"
    :disabled="fieldDisabled"
    :label="props.label"
    :placeholder="props.placeholder"
    :mask="props.mask"
    @blur="handleBlur"
  />
</template>
