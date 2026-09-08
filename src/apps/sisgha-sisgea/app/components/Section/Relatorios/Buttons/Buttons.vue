<script lang="ts" setup>
import { ReportButtons } from '@ladesa-ro/web.ui';

const emit = defineEmits<{
  (e: 'visualizar'): void;
  (e: 'gerarPdf'): void;
}>();
</script>

<template>
  <ReportButtons
    @visualizar="emit('visualizar')"
    @gerar-pdf="emit('gerarPdf')"
  />
</template>
