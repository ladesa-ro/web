<script setup lang="ts">
const emit = defineEmits<{
  (e: 'visualizar'): void;
  (e: 'gerarPdf'): void;
}>();
</script>

<template>
  <div class="relatorio-buttons u-flex u-w-full u-justify-between u-gap-4">
    <UIButtonDefault class="u-flex-1" @click="emit('visualizar')">
      Visualizar relatório
      <template #end-icon>
        <IconsEyeOn />
      </template>
    </UIButtonDefault>

    <UIButtonDefault class="u-flex-1" @click="emit('gerarPdf')">
      Gerar PDF do Relatório
      <template #end-icon>
        <IconsPdf />
      </template>
    </UIButtonDefault>
  </div>
</template>

<style scoped>
@media (max-width: 767.98px) {
  .relatorio-buttons {
    flex-direction: column;
  }
}
</style>
