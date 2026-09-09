<script lang="ts" setup>
import type { ScheduleWeekDay } from './schedule';

export type ScheduleHeaderDayProps = {
  diaDaSemana: ScheduleWeekDay;
};

defineProps<ScheduleHeaderDayProps>();
</script>

<template>
  <div class="ui-schedule-header-day u-px-4 u-py-2 u-text-center">
    <span class="ui-schedule-header-day__label">{{ diaDaSemana.nome }}</span>
  </div>
</template>
