<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  nameStart: string;
  nameEnd: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}>();

const {
  value: startValue,
  errorMessage: startError,
} = useField<string | null>(
  () => props.nameStart,
  undefined,
  {
    validateOnValueUpdate: false,
  },
);

const {
  value: endValue,
  errorMessage: endError,
} = useField<string | null>(
  () => props.nameEnd,
  undefined,
  {
    validateOnValueUpdate: false,
  },
);

const combinedError = computed(() => startError.value || endError.value);
</script>

<template>
  <UIFormTimeRangeField
    :start="startValue"
    :end="endValue"
    :label="label"
    :disabled="disabled"
    :readonly="readonly"
    :error="combinedError"
    @update:start="startValue = $event"
    @update:end="endValue = $event"
  />
</template>
