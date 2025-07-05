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
    class="flex items-center justify-center gap-1.5 min-w-10 h-10 px-2 border-2 rounded-lg transition-[background-color] border-(--color) text-(--color) hover:bg-(--color)/10 focus:outline-0 focus-visible:bg-(--color)/15 active:bg-(--color)/20 disabled:bg-transparent disabled:border-(--color)/40 disabled:text-(--color)/40"
  >
    <span v-if="text !== ''" class="font-semibold text-sm">{{ text }}</span>
    <span class="shrink-0" v-if="$slots['default']">
      <slot />
    </span>
  </button>
</template>
