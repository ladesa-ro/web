<script setup lang="ts">
import dayjs from '../-Helpers/dayjs';

const selectedDay = defineModel({
	default: dayjs(),
});
</script>

<template>
	<div class="flex flex-col gap-[15px]">
		<SectionHorarioHeaderSchedule v-model="selectedDay" />

		<SectionHorarioDailyViewDaysAndLessons v-model="selectedDay" />
	</div>
</template>

<style scoped></style>
