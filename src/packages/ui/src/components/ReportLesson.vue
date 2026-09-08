<script lang="ts" setup>
import { ref } from 'vue';
import ReportLine from './ReportLine.vue';

export type ReportLessonProps = {
  titulo: string;
  subtitulo: string;
  aulas: { data: string; horario: string }[];
};

defineProps<ReportLessonProps>();

const aulasExibidas = ref(4);

const carregarMais = () => {
  aulasExibidas.value += 2;
};
</script>

<template>
  <div class="ui-report-lesson u-mb-5">
    <div class="ui-report-lesson__header u-gap-1">
      <h6 class="ui-report-lesson__title u-font-semibold">{{ titulo }}</h6>
      <p class="ui-report-lesson__count">{{ subtitulo }}</p>
    </div>

    <div class="ui-report-lesson__content">
      <ReportLine
        v-for="item in aulas.slice(0, aulasExibidas)"
        :key="`${item.data}-${item.horario}`"
        :data="item.data"
        :horario="item.horario"
      />
    </div>

    <div
      v-if="aulasExibidas < aulas.length"
      class="ui-report-lesson__more u-flex u-items-center u-justify-center"
      @click="carregarMais"
    >
      <p class="ui-report-lesson__more-label">Ver Mais +</p>
    </div>
  </div>
</template>
