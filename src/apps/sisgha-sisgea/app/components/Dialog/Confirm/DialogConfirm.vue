<script lang="ts" setup>
import { DialogConfirm, type DialogConfirmProps } from '@ladesa-ro/web.ui';

defineProps<DialogConfirmProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
}>();
</script>

<template>
  <DialogConfirm
    v-bind="$props"
    @update:model-value="value => emit('update:modelValue', value)"
    @confirm="emit('confirm')"
  />
</template>
