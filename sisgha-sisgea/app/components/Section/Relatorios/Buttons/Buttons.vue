<script setup lang="ts">
const emit = defineEmits<{
  (e: 'visualizar'): void;
  (e: 'gerarPdf'): void;
}>();
</script>

<template>
  <div class="flex w-full justify-center items-center gap-4 mt-4">
    <UIButtonDefault @click="emit('visualizar')" class="text-sm">
      Visualizar relatório
      <template #end-icon>
        <IconsEyeOn />
      </template>
    </UIButtonDefault>

    <UIButtonDefault @click="emit('gerarPdf')" class="text-sm">
      Gerar PDF do Relatório
      <template #end-icon>
        <IconsPdf />
      </template>
    </UIButtonDefault>
  </div>
</template>
