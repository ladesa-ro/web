<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}>();

const {
  value: fieldValue,
  errorMessage,
} = useField<number>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  },
);
</script>

<template>
  <UIFormStepperStepper
    v-model="fieldValue"
    :label="label"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :error="errorMessage"
  />
</template>
