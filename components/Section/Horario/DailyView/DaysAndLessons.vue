<!-- // const lessons: ILesson[] = [
// 	genericLesson,
// 	genericLesson,
// 	genericLesson,
// 	genericLesson,
// 	genericLesson,
// ];

// const activeIndex = 2;

// function getVariantForIndex(index: number) {
// 	if (index < activeIndex) return 'completed';
// 	if (index === activeIndex) return 'active';
// 	return;
// } -->

<script setup lang="ts">
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';
import dayjs from '../-Helpers/dayjs';

const selectedDay = defineModel({
	default: dayjs(),
});

const genericLesson: ILesson = {
	discipline: 'Linguagem de Programação',
	class: '2° A Informática',
	environment: 'Sala 20',
	// startsAt: '13:50', //startsAt: start.format('HH.mm'),
	// endsAt: '14:40', //endsAt: end.format('HH.mm'),
};

const startClassTime = [ '7:30', '8:20', '9:10', '10:20', '11:10' ];
</script>

<template>
	<div class="max-w-screen-lg w-full">
		<SectionHorarioDailyViewDaySquareList v-model="selectedDay"/>

		<div class="flex flex-col gap-5 mt-12">
			<SectionHorarioDailyViewLesson
				v-for="classTime in startClassTime"
				:lesson="genericLesson"
				:start-time="classTime"
			/>
		</div>
	</div>
</template>

<style scoped></style>
