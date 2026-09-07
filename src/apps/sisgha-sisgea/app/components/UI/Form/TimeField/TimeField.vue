<script setup lang="ts">
import { FormTimeField } from '@ladesa-ro/web.ui';

defineProps<{
  modelValue?: string | null;
  label?: string;
  disabled?: boolean;
  error?: string;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
}>();
</script>

<template>
  <FormTimeField v-bind="$props" @update:model-value="value => emit('update:modelValue', value)" />
</template>
