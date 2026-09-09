<script setup lang="ts">
import { FormTimeRangeField } from '@ladesa-ro/web.ui';

defineProps<{
  start?: string | null;
  end?: string | null;
  label?: string;
  disabled?: boolean;
  error?: string;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  'update:start': [value: string | null];
  'update:end': [value: string | null];
}>();
</script>

<template>
  <FormTimeRangeField
    v-bind="$props"
    @update:start="value => emit('update:start', value)"
    @update:end="value => emit('update:end', value)"
  />
</template>
