<script setup lang="ts">
import { ViewMode } from './ViewMode';

const selectedOption = ref(ViewMode.DAILY_SCHEDULE);
</script>

<template>
	<div class="flex flex-col items-center gap-12 pb-14
		xl:max-w-screen-2xl xl:mx-auto
		max-xl:mx-16 
		max-[900px]:text-sm 
		max-[850px]:mx-7
	">
		<SectionHorarioHeaderSchedule v-model:option="selectedOption" />
		<SectionHorarioGeral v-if="selectedOption === ViewMode.GENERAL_SCHEDULE" />
		<SectionHorarioDailyViewDaysAndLessons v-else-if="selectedOption === ViewMode.DAILY_SCHEDULE" />
	</div>
</template>
