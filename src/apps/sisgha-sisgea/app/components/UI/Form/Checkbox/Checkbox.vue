<script lang="ts" setup>
import { FormCheckbox } from '@ladesa-ro/web.ui';

defineProps<{
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<template>
  <FormCheckbox
    v-bind="$props"
    @update:model-value="value => emit('update:modelValue', value)"
  >
    <slot />
  </FormCheckbox>
</template>
