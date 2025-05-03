<script setup lang="ts">
type Props = { outlineOnClink?: boolean };
const { outlineOnClink = true } = defineProps<Props>();
</script>

<template>
  <button class="ui-button" :class="{ outline: outlineOnClink }">
    <span v-if="$slots['start-icon']" class="w-5">
      <slot name="start-icon" />
    </span>

    <p class="text">
      <slot />
    </p>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.ui-button {
  @apply flex items-center gap-4 w-full px-5 py-[0.875rem];
  @apply rounded-[0.5625rem] bg-ldsa-green-1 font-semibold text-ldsa-white;
  @apply disabled:bg-ldsa-green-1/50;
}

.outline:focus,
.outline:focus-within {
  box-shadow: 0 0 0.5px 5px rgb(from var(--ladesa-green-1-color) R G B / 30%);
}

.text {
  @apply flex-1 text-center;
}
</style>
