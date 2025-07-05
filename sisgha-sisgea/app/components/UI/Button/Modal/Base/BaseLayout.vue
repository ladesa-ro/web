<script lang="ts" setup>
type Props = {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  opacity?: number;
};
const { text = 'Texto', color = 'black', opacity = 100 } = defineProps<Props>();

const defineColor = {
  '--color': `rgb(from ${color} R G B / ${opacity / 100})`,
};
</script>

<template>
  <button :style="defineColor" :type="type">
    <p class="font-medium">{{ text }}</p>

    <span class="w-3 opacity-85">
      <!-- slot that acepts an icon -->
      <slot />
    </span>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

button {
  @apply flex items-center justify-evenly h-9 min-w-[8.438rem];
  @apply border-solid border-2 rounded-lg border-(--color) text-(--color);
  @apply transition-[background-color] duration-200;
  @apply hover:bg-(--color)/15 focus-visible:bg-(--color)/15 active:bg-(--color)/30 disabled:bg-transparent disabled:border-(--color)/40 disabled:text-(--color)/40;
}
</style>
