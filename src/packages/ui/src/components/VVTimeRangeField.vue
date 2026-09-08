<script lang="ts" setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';
import FormTimeRangeField from './FormTimeRangeField.vue';
import { useFieldDisabled } from './form-context';

export type VVTimeRangeFieldProps = {
  nameStart: string;
  nameEnd: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
};

const props = defineProps<VVTimeRangeFieldProps>();

const fieldDisabled = useFieldDisabled(() => props.disabled);

const { value: startValue, errorMessage: startError } = useField<string | null>(
  () => props.nameStart,
  undefined,
  {
    validateOnValueUpdate: false,
  }
);

const { value: endValue, errorMessage: endError } = useField<string | null>(
  () => props.nameEnd,
  undefined,
  {
    validateOnValueUpdate: false,
  }
);

const combinedError = computed(() => startError.value || endError.value);
</script>

<template>
  <FormTimeRangeField
    :start="startValue"
    :end="endValue"
    :label="label"
    :disabled="fieldDisabled"
    :readonly="readonly"
    :error="combinedError"
    @update:start="startValue = $event"
    @update:end="endValue = $event"
  />
</template>
