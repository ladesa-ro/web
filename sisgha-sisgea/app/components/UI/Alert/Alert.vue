<script setup lang="ts">
import { IconsClose, IconsConfirm, IconsWarning } from '#components';
import IconInfo from '~/components/Icons/Info.vue';

type Props = {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
};
defineProps<Props>();

const rgb = (color: string) =>
  `rgb(from var(--ladesa-${color}-color) R G B / 1)`;

const defineType = {
  info: {
    color: { '--color': rgb('blue') },
    icon: IconInfo,
  },
  success: {
    color: { '--color': rgb('green-2') },
    icon: IconsConfirm,
  },
  warning: {
    color: { '--color': rgb('yellow') },
    icon: IconsWarning,
  },
  error: {
    color: { '--color': rgb('red') },
    icon: IconsClose,
  },
};
</script>

<template>
  <div
    :style="defineType[type].color"
    class="flex items-center gap-3 p-3 rounded-lg font-medium bg-(--color)/10 text-(--color) border-2 border-(--color)/10"
  >
    <component :is="defineType[type].icon" class="w-5" />

    {{ message }}
  </div>
</template>
