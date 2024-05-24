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
	<v-container class="flex flex-row justify-between">
		<SectionHorarioDailyViewDaySquare
			v-for="weekDay in weekDays"
			:active="weekDay.dayMonth === activeDayMonth"
			:dayWeek="weekDay.dayWeek"
			:dayMonth="weekDay.dayMonth"
			@click="selectedDay = weekDay.dayAsDayJs"
		/>
	</v-container>
</template>

<style scoped></style>
