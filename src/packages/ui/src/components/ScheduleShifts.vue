<script lang="ts" setup>
import ScheduleShift from './ScheduleShift.vue';
import type {
  ScheduleDiscipline,
  ScheduleShifts,
  ScheduleWeekDays,
} from './schedule';

export type ScheduleShiftsProps = {
  turnos: ScheduleShifts;
  diasDaSemana: ScheduleWeekDays;
  gradeDisciplinas: ScheduleDiscipline[];
};

const props = defineProps<ScheduleShiftsProps>();
</script>

<template>
  <ScheduleShift
    v-for="(turno, index) in turnos"
    :key="turno.nome"
    :class="{
      'ui-schedule-shifts__item--first': index === 0,
      'ui-schedule-shifts__item--last': index === props.turnos.length - 1,
    }"
    :dias-da-semana="diasDaSemana"
    :grade-disciplinas="gradeDisciplinas"
    :turno="turno"
  />
</template>
