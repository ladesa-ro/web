<template>
  <button
    class="flex items-center justify-center gap-3 p-3 border-2 border-ldsa-green-1 bg-ldsa-green-1/10 rounded-lg text-ldsa-text-green text-sm sm:text-base font-semibold w-full"
    @click="abrirModal"
  >
    <IconsCalendarItems class="w-[1.125rem] sm:w-5" />
    Ver eventos
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'open'): void;
}>();

const abrirModal = () => emit('open');
</script>
