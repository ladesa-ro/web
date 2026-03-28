<script setup lang="ts">
const emit = defineEmits<{
  (e: 'visualizar'): void;
  (e: 'gerarPdf'): void;
}>();
</script>

<template>
  <div class="flex max-md:flex-col w-full justify-between gap-4">
    <UIButtonDefault @click="emit('visualizar')" class="flex-1">
      Visualizar relatório
      <template #end-icon>
        <IconsEyeOn />
      </template>
    </UIButtonDefault>

    <UIButtonDefault @click="emit('gerarPdf')" class="flex-1">
      Gerar PDF do Relatório
      <template #end-icon>
        <IconsPdf />
      </template>
    </UIButtonDefault>
  </div>
</template>
