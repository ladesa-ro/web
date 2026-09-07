<script lang="ts" setup>
import { FormStepper } from '@ladesa-ro/web.ui';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    error?: string;
  }>(),
  {
    step: 1,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();
</script>

<template>
  <FormStepper v-bind="props" @update:model-value="value => emit('update:modelValue', value)" />
</template>
