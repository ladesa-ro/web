<script lang="ts" setup>
import { getWeekDays } from '../../../-Helpers/GetWeekDays';

//by default, the selected day is the current day. if today is sunday, the selected day will be monday
const selectedDay =
  useCurrentDay().value.day() !== 0
    ? useCurrentDay()
    : ref(useCurrentDay().value.day(1));

//formats the selected day
const activeDayMonth = computed(() => selectedDay.value.format('DD/MM'));

//array with the days of the week that the selected day belongs
const weekDays = getWeekDays(selectedDay.value);
</script>

<template>
  <div
    class="flex justify-between gap-2 min-[502px]:gap-4 lg:gap-6 xl:gap-12 w-full overflow-x-auto"
  >
    <SectionHorarioProfessorEAlunoDailyViewDaySquare
      v-for="weekDay in weekDays"
      :selected="weekDay.dayMonth === activeDayMonth"
      :day-month="weekDay.dayMonth"
      :day-week="weekDay.dayWeek"
      @pointerdown="selectedDay = weekDay.dayAsDayJs"
    />
  </div>
</template>
