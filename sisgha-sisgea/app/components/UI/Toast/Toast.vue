<script setup lang="ts">
import { IconsClose, IconsConfirm, IconsInfo, IconsWarning } from '#components';
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

function toastConfig(type: ToastType) {
  switch (type) {
    case 'success':
      return {
        classes: 'border-ldsa-green-2/10 bg-[#EAF5EC] text-ldsa-green-2',
        icon: IconsConfirm,
        iconClass: 'w-5 h-5 text-ldsa-green-2',
      };
    case 'error':
      return {
        classes: 'border-ldsa-red/10 bg-[#FAE8E8] text-ldsa-red',
        icon: IconsClose,
        iconClass: 'w-5 h-5',
      };
    case 'warning':
      return {
        classes: 'border-ldsa-yellow/10 bg-[#F8F6E6] text-ldsa-yellow',
        icon: IconsWarning,
        iconClass: 'w-5 h-5',
      };
    case 'info':
    default:
      return {
        classes: 'border-ldsa-blue/10 bg-[#E8EFFA] text-ldsa-blue',
        icon: IconsInfo,
        iconClass: 'w-5 h-5 text-ldsa-blue',
      };
  }
}

function handleActionClick(t: ToastItem) {
  if (t.onAction) {
    try {
      t.onAction();
    } catch (e) {}
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
          'rounded-lg shadow-sm border p-3 grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 items-start',
          toastConfig(toast.type).classes,
        ]"
      >
        <!-- icone -->
        <div class="flex-shrink-0">
          <component
            :is="toastConfig(toast.type).icon"
            :class="toastConfig(toast.type).iconClass"
          />
        </div>

        <!-- titulo + descrição -->
        <div class="flex flex-col justify-center space-y-1">
          <ToastTitle class="font-semibold text-sm">{{ toast.title }}</ToastTitle>
          <ToastDescription as-child v-if="toast.description">
            <div class="text-xs font-semibold text-slate-700">{{ toast.description }}</div>
          </ToastDescription>
        </div>

        <!-- acoes -->
        <div class="flex items-start justify-end gap-2">
          <ToastAction
            v-if="toast.actionLabel"
            as-child
            alt-text="Fechar toast"
          >
            <button
              @click="handleActionClick(toast)"
              class="px-2 py-1 rounded text-xs"
            >
              {{ toast.actionLabel }}
            </button>
          </ToastAction>

          <ToastClose as-child alt-text="Fechar toast">
            <button
              type="button"
              class="ml-2 text-slate-500 hover:text-slate-800"
              aria-label="Fechar"
            >
              <IconsClose class="h-3 w-3 text-ldsa-grey" />
            </button>
          </ToastClose>
        </div>
      </ToastRoot>
    </template>

    <ToastViewport
      class="[--viewport-padding:_12px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[360px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
    />
  </ToastProvider>
</template>
