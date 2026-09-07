<script lang="ts" setup>
import { FormRadioGroup, type FormRadioGroupProps } from '@ladesa-ro/web.ui';

defineProps<FormRadioGroupProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <FormRadioGroup
    :model-value="modelValue"
    :items="items"
    :label="label"
    :disabled="disabled"
    :orientation="orientation"
    @update:model-value="value => emit('update:modelValue', value)"
  />
</template>
