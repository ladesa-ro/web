<script setup lang="ts">
const selectedOption = ref(2)
</script>

<template>
	<div class="flex flex-col gap-4">
		<SectionHorarioHeaderSchedule v-model:option="selectedOption"/>
		<SectionHorarioGeral v-if="selectedOption === 1"/>
		<SectionHorarioDailyViewDaysAndLessons v-else-if="selectedOption === 2"/>
	</div>
</template>
