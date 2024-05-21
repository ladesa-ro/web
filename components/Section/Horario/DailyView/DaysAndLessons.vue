<script setup lang="ts">
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';
import dayjs from '../-Helpers/dayjs';

const selectedDay = defineModel({
	default: dayjs('2024-01-29'),
});

const genericLesson: ILesson = {
	discipline: 'Linguagem de Programação',
	class: '2° A Informática',
	environment: 'Sala 20',
	startsAt: '13:50',
	endsAt: '14:40',
};

const lessons: ILesson[] = [
	genericLesson,
	genericLesson,
	genericLesson,
	genericLesson,
	genericLesson,
];

const activeIndex = 2;

function getVariantForIndex(index: number) {
	if (index < activeIndex) return 'completed';
	if (index === activeIndex) return 'active';
	return;
}
</script>

<template>
	<SectionHorarioDailyViewDaySquareList v-model="selectedDay" />

	<v-container class="flex flex-col gap-5">
		<SectionHorarioDailyViewLesson
			v-for="(lesson, index) in lessons"
			:lesson="lesson"
			:variant="getVariantForIndex(index)"
		/>
	</v-container>
</template>

<style scoped></style>
