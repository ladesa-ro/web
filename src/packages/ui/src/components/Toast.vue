<script setup lang="ts">
import { ToastProvider, ToastViewport } from 'reka-ui';
import ToastEntry from './ToastEntry.vue';
import type { ToastItem } from './toast';

export type ToastProps = { items: ToastItem[] };

defineProps<ToastProps>();
</script>

<template>
  <ToastProvider>
    <ToastEntry v-for="toast in items" :key="toast.id" :toast="toast" />

    <ToastViewport class="ui-toast-viewport" />
  </ToastProvider>
</template>
