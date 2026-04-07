<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { getWeekDays } from '../../../-Helpers/GetWeekDays';

const selectedDay = defineModel<Dayjs>({ required: true });

const activeDayMonth = computed(() => selectedDay.value.format('DD/MM'));
const weekDays = computed(() => getWeekDays(selectedDay.value));
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
      @click="selectedDay = weekDay.dayAsDayJs"
    />
  </div>
</template>
