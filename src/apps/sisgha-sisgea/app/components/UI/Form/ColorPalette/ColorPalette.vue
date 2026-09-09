<script lang="ts" setup>
import { FormColorPalette } from '@ladesa-ro/web.ui';

defineProps<{
  modelValue: string | null;
  disabled?: boolean;
  colors?: string[];
  error?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [color: string];
}>();
</script>

<template>
  <FormColorPalette
    v-bind="$props"
    @update:model-value="color => emit('update:modelValue', color)"
  />
</template>
