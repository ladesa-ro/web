<script setup lang="ts">
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
} from 'reka-ui';
import IconClose from '../icons/Close.vue';
import IconConfirm from '../icons/Confirm.vue';
import IconInfo from '../icons/Info.vue';
import IconWarning from '../icons/Warning.vue';
import { closeToast, type ToastItem, type ToastType } from './toast';

export type ToastEntryProps = { toast: ToastItem };

const props = defineProps<ToastEntryProps>();

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

function runToastAction(action: ToastItem['onAction']) {
  try {
    action?.();
    return true;
  } catch {
    return false;
  }
}

function handleActionClick(t: ToastItem) {
  runToastAction(t.onAction);
  closeToast(t);
}
</script>

<template>
  <ToastRoot
    v-model:open="props.toast.open"
    class="ui-toast"
    :class="toastConfig(props.toast.type).classes"
  >
    <div class="ui-toast__icon-wrapper">
      <component
        :is="toastConfig(props.toast.type).icon"
        class="ui-toast__icon"
      />
    </div>

    <div class="ui-toast__body">
      <ToastTitle class="ui-toast__title">{{ props.toast.title }}</ToastTitle>
      <ToastDescription v-if="props.toast.description" as-child>
        <div class="ui-toast__description">{{ props.toast.description }}</div>
      </ToastDescription>
    </div>

    <div class="ui-toast__actions">
      <ToastAction
        v-if="props.toast.actionLabel"
        as-child
        alt-text="Fechar toast"
      >
        <button
          class="ui-toast__action"
          @click="handleActionClick(props.toast)"
        >
          {{ props.toast.actionLabel }}
        </button>
      </ToastAction>

      <ToastClose as-child alt-text="Fechar toast">
        <button type="button" class="ui-toast__close" aria-label="Fechar">
          <IconClose class="ui-toast__close-icon" />
        </button>
      </ToastClose>
    </div>
  </ToastRoot>
</template>
