<script setup lang="ts">
import { getWeekDays } from '~/components/Section/Horario/-Helpers/GetWeekDays';

const selectedDay = useSelectedDay();

const activeDayMonth = computed(() => selectedDay.value.format('DD/MM')); //formata dia atual

const weekDays = getWeekDays(selectedDay.value); //array com dias da semana

//===========================================================================================
//vou precisar usar onMount pra executar assim que iniciar

// const square = ref([]);

// let i: number = 0;
// for (const obj of weekDays) {
//   i++;
//   if (obj.dayMonth === activeDayMonth.value) break; //-> está aqui o que eu preciso
// }

//scrool

// watch(
//   [activeDayMonth],
//   () => {
//     if (typeof window !== 'undefined') {
//       const activeDayElement = document.querySelector(
//         `.scroll [data-day-month="${activeDayMonth.value}"]`
//       );

//       if (activeDayElement) {
//         activeDayElement.scrollIntoView();
//       }
//     }
//   },
//   { immediate: true }
// );
</script>

<template>
  <div
    class="flex flex-row justify-between max-w-screen-2xl w-full mx-auto max-sm:gap-3 max-sm:overflow-x-auto"
  >
    <SectionHorarioDailyViewDaySquare
      v-for="weekDay in weekDays"
      :active="weekDay.dayMonth === activeDayMonth"
      :dayWeek="weekDay.dayWeek"
      :dayMonth="weekDay.dayMonth"
      @click="selectedDay = weekDay.dayAsDayJs"
    />

    <!-- :data-day-month="weekDay.dayMonth"-->
  </div>
</template>
