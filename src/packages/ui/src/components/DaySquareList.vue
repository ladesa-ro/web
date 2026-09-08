<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { computed } from 'vue';
import DaySquare from './DaySquare.vue';
import { getWeekDays } from './week-day';

const selectedDay = defineModel<Dayjs>({ required: true });

const activeDayMonth = computed(() => selectedDay.value.format('DD/MM'));

const weekDays = computed(() => getWeekDays(selectedDay.value));
</script>

<template>
  <div class="ui-day-square-list">
    <DaySquare
      v-for="weekDay in weekDays"
      :key="weekDay.dayMonth"
      :selected="weekDay.dayMonth === activeDayMonth"
      :day-month="weekDay.dayMonth"
      :day-week="weekDay.dayWeek"
      @click="selectedDay = weekDay.dayAsDayJs"
    />
  </div>
</template>
