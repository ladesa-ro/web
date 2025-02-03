<script setup lang="ts">
type Props = {
  type: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  opacity?: number;
};
const { color = 'black', opacity = 100 } = defineProps<Props>();

const defineColor = {
  '--current-button-color': color,
  opacity: opacity / 100,
};
</script>

<template>
  <button :type="type" class="modal-button" :style="defineColor">
    <p class="font-medium">
      <slot>Texto</slot>
    </p>

    <span class="w-3 opacity-85">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.modal-button {
  @apply flex items-center justify-evenly h-9 min-w-[8.438rem] cursor-pointer;
  @apply border-solid border-2 rounded-lg;
  @apply border-[var(--current-button-color)] text-[var(--current-button-color)];
  @apply transition-[all] duration-200;
}

.modal-button:hover {
  background-color: rgb(from var(--current-button-color) R G B / 15%);
}

.modal-button:active {
  background-color: rgb(from var(--current-button-color) R G B / 30%);
}

.modal-button:disabled {
  background-color: transparent;
  border-color: rgb(from var(--current-button-color) R G B / 40%);
  color: rgb(from var(--current-button-color) R G B / 40%);
}
</style>
