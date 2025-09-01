<script setup lang="ts">
import { useRefHistory } from '@vueuse/core';
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '~/composables/schedule/EXEMPLO';
import type { WeekSchedule } from '~/composables/schedule/useScheduleTypes';
import { useWeekSchedule } from '~/composables/schedule/useWeekSchedule';

const weekSchedule = ref(
  useWeekSchedule(temposDeAulaExemplo, aulasSemDiaSemanaExemplo)
) as Ref<WeekSchedule>;

const weekScheduleHistory = useRefHistory(weekSchedule, {
  deep: true,
  capacity: 10,
});

const weekScheduleEditable = ref(
  [...weekSchedule.value.entries()].map(([dayMeta, daySchedule]) => ({
    data: dayMeta.data,
    schedule: daySchedule,
  }))
);

// Maps arrent reactive in vue, so is necessary to watch for changes in the editable array and update the original Map
watch(
  weekScheduleEditable,
  newVal => {
    weekSchedule.value.forEach((_, dayMeta) => {
      const changedDay = newVal.find(val => val.data === dayMeta.data);

      if (changedDay) {
        weekSchedule.value.set(dayMeta, changedDay.schedule);
      }
    });
  },
  { deep: true }
);
</script>

<template>
  <template v-for="(_, idx) in weekScheduleEditable" :key="idx">
    <SectionHorarioDapeEditDay
      v-model="weekScheduleEditable[idx]!.schedule"
      @atividade-change="weekScheduleHistory.commit()"
    />
  </template>
</template>
