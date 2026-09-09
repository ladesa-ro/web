<script lang="ts" setup>
import ScheduleHeaderDay from './ScheduleHeaderDay.vue';
import type { ScheduleWeekDays } from './schedule';

export type ScheduleHeaderDaysProps = {
  diasDaSemana: ScheduleWeekDays;
};

defineProps<ScheduleHeaderDaysProps>();
</script>

<template>
  <ScheduleHeaderDay
    v-for="diaDaSemana in diasDaSemana"
    :key="diaDaSemana.nome"
    :dia-da-semana="diaDaSemana"
  />
</template>
