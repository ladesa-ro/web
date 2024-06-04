<script setup lang="ts">
import { ViewMode } from './ViewMode';

const selectedOption = ref(ViewMode.DAILY_SCHEDULE);
</script>

<template>
	<div class="flex flex-col gap-8 max-w-screen-2xl mx-auto px-4">
		<SectionHorarioHeaderSchedule v-model:option="selectedOption" />
		<SectionHorarioGeral v-if="selectedOption === ViewMode.GENERAL_SCHEDULE" />
		<SectionHorarioDailyViewDaysAndLessons v-else-if="selectedOption === ViewMode.DAILY_SCHEDULE" />
	</div>
</template>
