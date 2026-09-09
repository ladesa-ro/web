<script lang="ts" setup>
import { ConfirmContent, type ConfirmContentProps } from '@ladesa-ro/web.ui';

defineProps<ConfirmContentProps>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <ConfirmContent
    v-bind="$props"
    @confirm="emit('confirm')"
    @cancel="emit('cancel')"
  />
</template>
