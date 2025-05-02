<script setup lang="ts">
import type { Item } from './item';

type Props = {
  item: Item;
  selected: boolean;
};

defineProps<Props>();
</script>

<template>
  <button class="toggle-button" :class="{ selected: selected }">
    {{ item.text }}
    <component :is="item.icon" class="icon" />
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.toggle-button {
  @apply flex w-full gap-2 items-center justify-center p-3 text-ldsa-grey border-2 border-r-0;
  @apply text-sm sm:text-base font-semibold;
}

.toggle-button:first-child {
  @apply rounded-s-lg;
}

.toggle-button:not(:first-child) {
  @apply border-l-ldsa-grey;
}

.toggle-button:last-child {
  @apply rounded-e-lg border-r-2;
}

.toggle-button.selected {
  @apply bg-ldsa-green-1/10 text-ldsa-text-green border-ldsa-green-1;
}

.selected + .toggle-button {
  @apply border-l-ldsa-green-1;
}

.icon {
  @apply w-[1.125rem] sm:w-5 shrink-0;
}
</style>
