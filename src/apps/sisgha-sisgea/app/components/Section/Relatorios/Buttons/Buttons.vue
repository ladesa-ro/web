<script setup lang="ts">
const emit = defineEmits<{
  (e: 'visualizar'): void;
  (e: 'gerarPdf'): void;
}>();
</script>

<template>
  <div class="flex max-md:flex-col w-full justify-between gap-4">
    <UIButtonDefault class="flex-1" @click="emit('visualizar')">
      Visualizar relatório
      <template #end-icon>
        <IconsEyeOn />
      </template>
    </UIButtonDefault>

    <UIButtonDefault class="flex-1" @click="emit('gerarPdf')">
      Gerar PDF do Relatório
      <template #end-icon>
        <IconsPdf />
      </template>
    </UIButtonDefault>
  </div>
</template>
