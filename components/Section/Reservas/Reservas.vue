<script setup lang="ts">
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const genericLesson: ILesson = {
	discipline: 'Linguagem de Programação',
	class: '2° A Informática',
	environment: 'Sala 20',
	startsAt: '13:50',
	endsAt: '14:40',
};

const lessons: ILesson[] = [
	genericLesson, // 0 < 2 --- completed
	genericLesson, // 1 < 2 --- completed
	genericLesson, // 2 == 2 -- active
	genericLesson, // 3 > 2 --- default
	genericLesson, // 4 > 2 --- default
];

const activeIndex = 2;

function getVariantForIndex(index: number) {
	if (index < activeIndex) {
		return 'completed';
	}

	if (index === activeIndex) {
		return 'active';
	}

	return;
}
</script>

<template>
	<div class="flex flex-col gap-[15px]">
		<div class="mt-14">
			<v-container>
				<UISearchBar id="size" />
			</v-container>
		</div>

		<SectionHorarioDailyViewDaySquareList />

		<v-container class="flex flex-col gap-5">
			<SectionHorarioDailyViewLesson
				v-for="(lesson, index) in lessons"
				:lesson="lesson"
				:variant="getVariantForIndex(index)"
			/>
		</v-container>
	</div>
</template>

<style scoped>
#size {
	max-width: none;
}
</style>
