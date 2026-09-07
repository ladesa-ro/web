<script setup lang="ts">
import { ToastAction, ToastClose, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui';
import IconClose from '../icons/Close.vue';
import IconConfirm from '../icons/Confirm.vue';
import IconInfo from '../icons/Info.vue';
import IconWarning from '../icons/Warning.vue';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastItem = {
  id: number | string;
  open: any;
  title: string;
  description?: string;
  type: ToastType;
  actionLabel?: string;
  onAction?: () => void;
};

export type ToastProps = { items: ToastItem[] };
defineProps<ToastProps>();

function toastConfig(type: ToastType) {
  switch (type) {
    case 'success':
      return { classes: 'ui-toast--success', icon: IconConfirm };
    case 'error':
      return { classes: 'ui-toast--error', icon: IconClose };
    case 'warning':
      return { classes: 'ui-toast--warning', icon: IconWarning };
    case 'info':
    default:
      return { classes: 'ui-toast--info', icon: IconInfo };
  }
}

function handleActionClick(t: ToastItem) {
  if (t.onAction) {
    try {
      t.onAction();
    } catch {
      // ação do toast falhou; o toast ainda deve fechar
    }
  }
  t.open.value = false;
}
</script>

<template>
  <ToastProvider>
    <template v-for="toast in items" :key="toast.id">
      <ToastRoot v-model:open="toast.open" class="ui-toast" :class="toastConfig(toast.type).classes">
        <div class="ui-toast__icon-wrapper">
          <component :is="toastConfig(toast.type).icon" class="ui-toast__icon" />
        </div>

        <div class="ui-toast__body">
          <ToastTitle class="ui-toast__title">{{ toast.title }}</ToastTitle>
          <ToastDescription v-if="toast.description" as-child>
            <div class="ui-toast__description">{{ toast.description }}</div>
          </ToastDescription>
        </div>

        <div class="ui-toast__actions">
          <ToastAction v-if="toast.actionLabel" as-child alt-text="Fechar toast">
            <button class="ui-toast__action" @click="handleActionClick(toast)">{{ toast.actionLabel }}</button>
          </ToastAction>

          <ToastClose as-child alt-text="Fechar toast">
            <button type="button" class="ui-toast__close" aria-label="Fechar">
              <IconClose class="ui-toast__close-icon" />
            </button>
          </ToastClose>
        </div>
      </ToastRoot>
    </template>

    <ToastViewport class="ui-toast-viewport" />
  </ToastProvider>
</template>
