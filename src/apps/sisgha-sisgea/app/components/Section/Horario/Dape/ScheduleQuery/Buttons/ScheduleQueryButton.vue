<script setup lang="ts">
type Props = {
  color?: string;
  text?: string;
};

const { color = 'var(--ladesa-grey-color)', text = '' } = defineProps<Props>();

const buttonColor = { '--color': color };
</script>

<template>
  <!-- TODO: add radix tooltip -->
  <button
    :style="buttonColor"
    class="schedule-query-button u-flex u-items-center u-justify-center u-gap-1-5 u-px-2"
  >
    <span v-if="text !== ''" class="u-font-semibold u-text-sm">{{ text }}</span>

    <span v-if="$slots['default']" class="u-shrink-0">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.schedule-query-button {
  min-width: var(--ui-space-10);
  height: var(--ui-space-10);
  border: 2px solid var(--color);
  border-radius: var(--ui-radius-lg);
  color: var(--color);
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.schedule-query-button:hover {
  background-color: rgb(from var(--color) R G B / 10%);
}

.schedule-query-button:focus {
  outline: 0;
}

.schedule-query-button:focus-visible {
  background-color: rgb(from var(--color) R G B / 15%);
}

.schedule-query-button:active {
  background-color: rgb(from var(--color) R G B / 20%);
}

.schedule-query-button:disabled {
  cursor: not-allowed;
  background-color: transparent;
  border-color: rgb(from var(--color) R G B / 40%);
  color: rgb(from var(--color) R G B / 40%);
}
</style>
