<script setup lang="ts">
type Props = {
  type: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
};
const { color = 'black' } = defineProps<Props>();

const defineColor = {
  '--current-button-color': color,
} 
</script>

<template>
  <button :type="type" class="modal-button" :style="defineColor" >
    <p class="font-medium">
      <slot>Texto</slot>
    </p> 

    <span class="w-3 opacity-85">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>
.modal-button {
  @apply block flex items-center justify-between h-9 max-w-[8.438rem];
  @apply py-1.5 px-[1.125rem] border-solid border-2 rounded-lg;
  @apply border-[var(--current-button-color)] text-[var(--current-button-color)];
  @apply transition-[background-color] duration-[250ms];
}

.modal-button:hover {
  background-color: rgb(from var(--current-button-color) R G B / 20%);
}
</style>
