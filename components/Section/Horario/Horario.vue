<script setup lang="ts">
import { generatePdf } from './GeneratePdf/generatePdf';
import { ViewMode } from './ViewMode';

const selectedOption = ref(ViewMode.DAILY_SCHEDULE);

//generatePdf
const el = ref<HTMLElement | null>(null);

function generatePDF() {
  generatePdf(el.value);
}
</script>

<template>
  <div
    class="flex flex-1 overflow-auto flex-col items-center gap-12 pb-14 xl:max-w-screen-2xl xl:mx-auto max-xl:mx-16 max-[900px]:text-sm max-[850px]:mx-7"
  >
    <SectionHorarioHeaderSchedule v-model:option="selectedOption" />

    <section v-if="selectedOption === ViewMode.GENERAL_SCHEDULE" ref="el" class="flex flex-col items-center gap-8">
      <SectionHorarioGeral />

      <button class="flex justify-center items-center bg-[#118D3B] h-14 w-40 text-white rounded-lg" @click="generatePDF">Gerar PDF</button>
    </section>

    <SectionHorarioDailyViewDaysAndLessons v-else />
    <!--v-else-if="selectedOption === ViewMode.DAILY_SCHEDULE"-->
  </div>
</template>
