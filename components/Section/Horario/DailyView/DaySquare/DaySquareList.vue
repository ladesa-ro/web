<script setup lang="ts">
import { getWeekDays } from '../../-Helpers/GetWeekDays';
import dayjs from '../../-Helpers/dayjs';

const selectedDay = defineModel({
	default: dayjs(),
});

const activeDayMonth = computed(()=> selectedDay.value.format('DD/MM'));

const weekDays = getWeekDays(selectedDay.value);
</script>

<template>
	<div class="flex flex-row justify-between max-w-screen-2xl w-full mx-auto">
		<SectionHorarioDailyViewDaySquare
			v-for="weekDay in weekDays"
			:active="weekDay.dayMonth === activeDayMonth"
			:dayWeek="weekDay.dayWeek"
			:dayMonth="weekDay.dayMonth"
			@click="selectedDay = weekDay.dayAsDayJs"
		/>
	</div>
</template>

<style scoped></style>
