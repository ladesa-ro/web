<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { getWeekDays } from '~/utils/get-week-days';

const selectedDay = defineModel<Dayjs>({ required: true });

const activeDayMonth = computed(() => selectedDay.value.format('DD/MM'));
const weekDays = computed(() => getWeekDays(selectedDay.value));
</script>

<template>
  <div class="day-square-list">
    <SectionHorarioProfessorEAlunoDailyViewDaySquare
      v-for="weekDay in weekDays"
      :selected="weekDay.dayMonth === activeDayMonth"
      :day-month="weekDay.dayMonth"
      :day-week="weekDay.dayWeek"
      @click="selectedDay = weekDay.dayAsDayJs"
    />
  </div>
</template>

<style scoped>
.day-square-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-x: auto;
  gap: var(--ui-space-2);
}

@media (min-width: 502px) {
  .day-square-list {
    gap: var(--ui-space-4);
  }
}

@media (min-width: 1024px) {
  .day-square-list {
    gap: var(--ui-space-6);
  }
}

@media (min-width: 1280px) {
  .day-square-list {
    gap: var(--ui-space-12);
  }
}
</style>
