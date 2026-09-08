<script lang="ts" setup>
import FormTimeField from './FormTimeField.vue';
import { useVVField } from './vv-field';

export type VVTimeFieldProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
};

const props = defineProps<VVTimeFieldProps>();

const {
  fieldValue: modelValue,
  errorMessage,
  fieldDisabled,
} = useVVField<string | null>({
  name: props.name,
  disabled: props.disabled,
  required: props.required,
});
</script>

<template>
  <FormTimeField
    v-model="modelValue"
    :label="props.label"
    :disabled="fieldDisabled"
    :error="errorMessage"
  />
</template>
