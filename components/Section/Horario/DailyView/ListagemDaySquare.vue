<script setup>
const weekDays = [
	{ dayWeek: 'Segunda', dayMonth: '06/03' },
	{ dayWeek: 'Terça', dayMonth: '07/03' },
	{ dayWeek: 'Quarta', dayMonth: '08/03' },
	{ dayWeek: 'Quinta', dayMonth: '09/03' },
	{ dayWeek: 'Sexta', dayMonth: '10/03' },
	{ dayWeek: 'Sábado', dayMonth: '11/03' },
];

const activeDay = ref('06/03');
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
