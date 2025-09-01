<script setup lang="ts">
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '~/composables/schedule/EXEMPLO';
import type { WeekdayMeta, WeekSchedule } from '~/composables/schedule/useScheduleTypes';
import { useWeekSchedule } from '~/composables/schedule/useWeekSchedule';

const weekSchedule = ref(
  useWeekSchedule(temposDeAulaExemplo, aulasSemDiaSemanaExemplo)
) as Ref<WeekSchedule>;

const horarioParaExibir = computed(() => {
  const obj: Record<string, any> = {};
  for (const [key, value] of weekSchedule.value.entries()) {
    obj[`${key.data}, ${key.weekday}`] = value;
  }
  return obj;
});
</script>

<template>
  <pre>

    {{ horarioParaExibir }}
  </pre>
  <!--
  aqui que posso tentar fazer a table
  mas primeiro preciso fazer o componente funcionar <=

  <div v-for="(shifts, idx) in weekSchedule" :key="idx">
    <SectionHorarioDapeEditDay v-model="shifts[idx]" />
  </div>
  -->
</template>
