<script lang="ts" setup>
import { useField } from 'vee-validate';
import FormStepper from './FormStepper.vue';
import { useFieldDisabled } from './form-context';

export type VVStepperProps = {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

const props = defineProps<VVStepperProps>();

const fieldDisabled = useFieldDisabled(() => props.disabled);

const { value: fieldValue, errorMessage } = useField<number>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  }
);
</script>

<template>
  <FormStepper
    v-model="fieldValue"
    :label="label"
    :min="min"
    :max="max"
    :step="step"
    :disabled="fieldDisabled"
    :error="errorMessage"
  />
</template>
