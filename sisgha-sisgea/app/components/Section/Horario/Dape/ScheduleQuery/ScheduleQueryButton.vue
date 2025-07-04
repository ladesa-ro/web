<script setup lang="ts">
type Props = {
  color?: string;
  text?: string;
};

const { color = 'var(--ladesa-grey-color)', text = '' } = defineProps<Props>();

const buttonColor = { '--color': color };
</script>

<template>
  <button
    :style="buttonColor"
    class="flex items-center justify-center gap-2 min-w-12 h-12 border-3 rounded-lg transition-[background-color] border-(--color) text-(--color) hover:bg-(--color)/10 focus-visible:bg-(--color)/10 active:bg-(--color)/20 disabled:bg-transparent disabled:border-(--color)/40 disabled:text-(--color)/40"
  >
    <span class="font-medium text-sm">{{ text }}</span>
    <slot />
  </button>
</template>
