<script lang="ts" setup>
import { generatePdf } from './GeneratePdf/generatePdf';
import { ViewMode } from './ViewMode';

const selectedOption = ref(ViewMode.DAILY_SCHEDULE);

//generatePdf
const el = ref<HTMLElement | null>(null);

function generatePDF() {
  generatePdf(el.value as any);
}
</script>

<template>
  <div
    class="flex flex-col items-center gap-12 overflow-auto w-full pb-14 xl:max-w-screen-2xl xl:mx-auto max-xl:mx-16 max-[900px]:text-sm max-[850px]:mx-7"
  >
    <!-- Cabeçalho -->
    <SectionHorarioHeaderSchedule v-model:option="selectedOption" />

    <!-- Opção "Horário geral" -->
    <template
      v-if="selectedOption === ViewMode.GENERAL_SCHEDULE"
      ref="el"
      class="flex flex-col items-center max-w-full overflow-hidden"
    >
      <SectionHorarioGeral class="overflow-auto" />

      <div class="mt-8" />

      <!-- Botão "Gerar PDF" -->
      <UIButtonDefault class="min-h-14 max-w-40 mb-2" @click="generatePDF">
        Gerar PDF
      </UIButtonDefault>
    </template>

    <!-- Opção "Horário do dia" -->
    <SectionHorarioDailyViewDaysAndLessons v-else />
  </div>
</template>
