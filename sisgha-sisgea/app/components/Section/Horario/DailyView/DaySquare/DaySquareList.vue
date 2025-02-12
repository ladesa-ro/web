<script lang="ts" setup>
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
      :day-month="weekDay.dayMonth"
      :day-week="weekDay.dayWeek"
      @click="selectedDay = weekDay.dayAsDayJs"
    />
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.layout-size {
  @apply flex flex-row justify-between w-full mx-auto;
  @apply max-w-screen-2xl;
  @apply max-sm:gap-3 max-sm:overflow-x-auto;
}
</style>
