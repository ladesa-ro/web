<script lang="ts" setup>
import ScheduleShifts from './ScheduleShifts.vue';
import type {
  ScheduleDiscipline,
  ScheduleShifts as ScheduleShiftsModel,
  ScheduleWeekDays,
} from './schedule';

export type ScheduleGridProps = {
  turnos: ScheduleShiftsModel;
  diasDaSemana: ScheduleWeekDays;
  gradeDisciplinas: ScheduleDiscipline[];
};

defineProps<ScheduleGridProps>();
</script>

<template>
  <div class="ui-schedule-grid">
    <ScheduleShifts
      :dias-da-semana="diasDaSemana"
      :turnos="turnos"
      :grade-disciplinas="gradeDisciplinas"
    />
  </div>
</template>
