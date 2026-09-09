<script lang="ts" setup>
import { RRuleEditor, type RRuleEditorProps } from '@ladesa-ro/web.ui';

defineProps<RRuleEditorProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
}>();
</script>

<template>
  <RRuleEditor
    :model-value="modelValue"
    :disabled="disabled"
    :error="error"
    @update:model-value="value => emit('update:modelValue', value)"
  />
</template>
