<script setup lang="ts">
const emit = defineEmits<{
  (e: 'visualizar'): void,
  (e: 'gerarPdf'): void,
}>();
</script>

<template>
  <div class="flex w-full justify-center items-center gap-4 mt-4">
    <UIButtonDefault @click="emit('visualizar')" class="text-[0.75rem]">
      Visualizar relatório
      <template #end-icon>
        <IconsEyesEyeOn class="flex w-6 h-6 ml-4" />
      </template>
    </UIButtonDefault>

    <UIButtonDefault @click="emit('gerarPdf')" class="text-[0.75rem]">
      Gerar PDF do Relatório
      <template #end-icon>
        <IconsIconPdf class="flex w-6 h-6 mr-4" />
      </template>
    </UIButtonDefault>
  </div>
</template>
