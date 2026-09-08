<script lang="ts" setup>
import Button from './Button.vue';
import IconEyeOn from '../icons/Eye/EyeOn.vue';
import IconPdf from '../icons/Pdf.vue';

const emit = defineEmits<{
  (e: 'visualizar'): void;
  (e: 'gerarPdf'): void;
}>();
</script>

<template>
  <div class="ui-report-buttons u-flex u-w-full u-justify-between u-gap-4">
    <Button class="u-flex-1" @click="emit('visualizar')">
      Visualizar relatório

      <template #end-icon>
        <IconEyeOn />
      </template>
    </Button>

    <Button class="u-flex-1" @click="emit('gerarPdf')">
      Gerar PDF do Relatório

      <template #end-icon>
        <IconPdf />
      </template>
    </Button>
  </div>
</template>
