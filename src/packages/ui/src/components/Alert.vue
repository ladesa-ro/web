<script setup lang="ts">
import IconClose from '../icons/Close.vue';
import IconConfirm from '../icons/Confirm.vue';
import IconInfo from '../icons/Info.vue';
import IconWarning from '../icons/Warning.vue';

type Props = {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
};
defineProps<Props>();

const rgb = (color: string) => `rgb(from var(--ladesa-${color}-color) R G B / 1)`;

const defineType = {
  info: {
    color: { '--ui-alert-color': rgb('blue') },
    icon: IconInfo,
  },
  success: {
    color: { '--ui-alert-color': rgb('green-2') },
    icon: IconConfirm,
  },
  warning: {
    color: { '--ui-alert-color': rgb('yellow') },
    icon: IconWarning,
  },
  error: {
    color: { '--ui-alert-color': rgb('red') },
    icon: IconClose,
  },
};
</script>

<template>
  <div class="ui-alert" :style="defineType[type].color">
    <component :is="defineType[type].icon" class="ui-alert__icon" />

    {{ message }}
  </div>
</template>
