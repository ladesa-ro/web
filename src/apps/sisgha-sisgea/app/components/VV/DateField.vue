<script lang="ts" setup>
import { useVVField } from './-Helpers/useVVField';

const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}>();

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
  <UIFormTextField
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
