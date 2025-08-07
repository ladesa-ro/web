<script setup lang="ts">
type Props = { outlineOnClink?: boolean };
const { outlineOnClink = true } = defineProps<Props>();
</script>

<template>
  <button class="ui-button" :class="{ 'button-outline': outlineOnClink }">
    <span v-if="$slots['start-icon']" class="w-5">
      <slot name="start-icon" />
    </span>

    <p class="flex-1 text-center">
      <slot />
    </p>

    <span v-if="$slots['end-icon']" class="w-5">
      <slot name="end-icon" />
    </span>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.ui-button {
  @apply flex items-center gap-4 px-2.5 lg:px-5 py-3.5;
  @apply rounded-[0.5625rem] bg-ldsa-green-1 font-semibold text-ldsa-white max-lg:text-sm;
  @apply disabled:bg-ldsa-green-1/50;
}

.button-outline:focus,
.button-outline:focus-within {
  box-shadow: 0 0 0.5px 5px rgb(from var(--ladesa-green-1-color) R G B / 30%);
}
</style>
