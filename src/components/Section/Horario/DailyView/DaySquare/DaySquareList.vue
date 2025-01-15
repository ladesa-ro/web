<script setup lang="ts">
import { getWeekDays } from '~/components/Section/Horario/-Helpers/GetWeekDays';

//by default, the selected day is the current day
const selectedDay = useSelectedDay();

//formats the selected day
const activeDayMonth = computed(() => selectedDay.value.format('DD/MM'));

//array with the days of the week that the selected day belongs
const weekDays = getWeekDays(selectedDay.value);
</script>

<template>
  <div class="layout-size">
    <SectionHorarioDailyViewDaySquare
      v-for="weekDay in weekDays"
      :active="weekDay.dayMonth === activeDayMonth"
      :day-week="weekDay.dayWeek"
      :day-month="weekDay.dayMonth"
      @click="selectedDay = weekDay.dayAsDayJs"
    />
  </div>
</template>

<style scoped>
.layout-size {
  @apply flex flex-row justify-between w-full mx-auto;
  @apply max-w-screen-2xl;
  @apply max-sm:gap-3 max-sm:overflow-x-auto;
}
</style>