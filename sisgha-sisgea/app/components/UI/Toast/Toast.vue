<!-- ~/components/UI/Toast.vue -->
<script setup lang="ts">
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'reka-ui';
import type { ToastItem } from '~/composables/useToast';
import { useToast } from '~/composables/useToast';

const { toasts } = useToast();

// classes base (use seu design / tailwind). Ajuste conforme seu tema.
function classesForType(type: string) {
  switch (type) {
    case 'success':
      return 'border-green-200 bg-green-50';
    case 'error':
      return 'border-red-200 bg-red-50';
    case 'warning':
      return 'border-yellow-200 bg-yellow-50';
    case 'info':
    default:
      return 'border-slate-200 bg-white';
  }
}

function handleActionClick(t: ToastItem) {
  if (t.onAction) {
    try {
      t.onAction();
    } catch (e) {
      /* ignore */
    }
  }
  t.open.value = false;
}
</script>

<template>
  <ToastProvider>
    <template v-for="toast in toasts" :key="toast.id">
      <ToastRoot
        v-model:open="toast.open"
        :class="[
          'rounded-lg shadow-sm border p-3 grid [grid-template-areas:_title_action_ description_action] grid-cols-[auto_max-content] gap-x-3 items-center',
          classesForType(toast.type),
        ]"
      >
        <ToastTitle class="[grid-area:_title] mb-1 font-medium text-sm">
          {{ toast.title }}
        </ToastTitle>

        <ToastDescription as-child>
          <div class="[grid-area:_description] m-0 text-xs leading-[1.3]">
            {{ toast.description }}
          </div>
        </ToastDescription>

        <ToastAction
          v-if="toast.actionLabel"
          class="[grid-area:_action]"
          as-child
          alt-text="Perform action"
        >
          <button
            @click="handleActionClick(toast)"
            class="inline-flex items-center justify-center rounded-md font-medium text-xs px-2 py-[3px] h-[28px] bg-white"
          >
            {{ toast.actionLabel }}
          </button>
        </ToastAction>

        <ToastClose class="[grid-area:_action]" />
      </ToastRoot>
    </template>

    <ToastViewport
      class="[--viewport-padding:_12px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[360px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
    />
  </ToastProvider>
</template>
