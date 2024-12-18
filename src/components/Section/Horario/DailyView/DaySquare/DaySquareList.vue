<script setup lang="ts">
import { getWeekDays } from '~/components/Section/Horario/-Helpers/GetWeekDays';

const selectedDay = useSelectedDay();

const activeDayMonth = computed(() => selectedDay.value.format('DD/MM')); //formata dia atual

const weekDays = getWeekDays(selectedDay.value); //array com dias da semana
</script>

<template>
  <div
    class="flex flex-row justify-between max-w-screen-2xl w-full mx-auto max-sm:gap-3 max-sm:overflow-x-auto"
  >
    <SectionHorarioDailyViewDaySquare
      v-for="weekDay in weekDays"
      :active="weekDay.dayMonth === activeDayMonth"
      :day-week="weekDay.dayWeek"
      :day-month="weekDay.dayMonth"
      @click="selectedDay = weekDay.dayAsDayJs"
    />
  </div>
</template>
