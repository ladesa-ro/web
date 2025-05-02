<script lang="ts" setup>
import { getWeekDays } from '~/components/Section/Horario/-Helpers/GetWeekDays';

//by default, the selected day is the current day. if today is sunday, the selected day will be monday
const selectedDay =
  useSelectedDay().value.day() !== 0
    ? useSelectedDay()
    : ref(useSelectedDay().value.day(1));

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
@reference "~/assets/styles/app-reference.css";

.layout-size {
  @apply flex justify-between gap-4 lg:gap-6 xl:gap-12;
  @apply w-full max-w-screen-2xl overflow-x-auto;
}
</style>
