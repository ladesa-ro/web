<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="flex items-center justify-center gap-2 px-2 h-7.5 text-sm font-medium text-ldsa-grey transition-colors hover:bg-ldsa-grey/15 active:bg-ldsa-grey/30 disabled:text-ldsa-grey/40 disabled:bg-transparent"
  >
    <p>Adicionar horário de aula</p>
    <IconsAdd class="w-2.5" />
  </button>
</template>
