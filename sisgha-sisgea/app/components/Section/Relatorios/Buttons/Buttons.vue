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
        <IconsEyesEyeOn />
      </template>
    </UIButtonDefault>

    <UIButtonDefault @click="emit('gerarPdf')" class="text-sm">
      Gerar PDF do Relatório
      <template #end-icon>
        <IconsIconPdf />
      </template>
    </UIButtonDefault>
  </div>
</template>
