<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import updateLocale from "dayjs/plugin/updateLocale";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.locale('pt-br');
dayjs.extend(weekOfYear)
dayjs.extend(updateLocale)
dayjs.updateLocale('pt-br', {
  weekdays: [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
  ]
})

type IWeekDay = {
	dayWeek: string;
	dayMonth: string;
};

const referenceDay = dayjs();

function getWeekDays(): IWeekDay[] {
	const fullWeek: dayjs.Dayjs[] = []; 

	for (let i = 1; i <= 6; i++) { 
	  fullWeek.push(referenceDay.day(i));
	}

	const weekDays: IWeekDay[] = fullWeek.map((day): IWeekDay => {
		return {
			dayWeek: day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').substring(1),
			dayMonth: day.format('DD/MM'),
		};
	});
	return weekDays;
}
const weekDays = getWeekDays();

let activeDay: Ref<string>;
const today = dayjs();

//define what the initial value of activeDay will be
if (referenceDay.year() !== today.year() || referenceDay.week() !== today.week()) {
	activeDay = ref(referenceDay.day(1).format('DD/MM'));
} else {
	activeDay = ref(today.format('DD/MM'));
}
</script> 

<template>
<v-container class="flex flex-row justify-between">
	<SectionHorarioDailyViewDaySquare
		v-for="weekDay in weekDays"
		:active="weekDay.dayMonth === activeDay"
		:dayWeek="weekDay.dayWeek"
		:dayMonth="weekDay.dayMonth"
		@click="activeDay = weekDay.dayMonth"
	/>
</v-container>
</template>

<style scoped></style>