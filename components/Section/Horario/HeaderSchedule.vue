<script setup lang="ts">
import { capitalizeFirst } from './-Helpers/CapitalizeFirst';
import { getWeekDays } from './-Helpers/GetWeekDays';
import dayjs from './-Helpers/dayjs';
import { ViewMode } from './ViewMode';

//set month and week
const selectedDay = defineModel('day', { default: dayjs() });

const month = capitalizeFirst(selectedDay.value.format('MMMM'));

const weekDays = getWeekDays(selectedDay.value);

const firstWeekDay = weekDays[0];
const lastWeekDay = weekDays[5];

const selectedOption = defineModel('option', { default: ViewMode.DAILY_SCHEDULE })
</script>

<template>
<div class="flex justify-between mt-14 max-w-screen-2xl w-full mx-auto">
	<div class="flex font-[600] items-center gap-2">
		{{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}
		<IconsArrowIconArrow
			class="-rotate-90 cursor-pointer -icon-green"
		/>
	</div>

	<section class="flex cursor-pointer">
		<!--left button-->
		<div
			class="flex gap-2 items-center border-2 p-3 font-[600] rounded-l-lg text-[#9AB69E]"
			:class="{'active': selectedOption === ViewMode.GENERAL_SCHEDULE, 'border-r-0': selectedOption !== ViewMode.GENERAL_SCHEDULE}"
			@click="selectedOption = ViewMode.GENERAL_SCHEDULE"
		>
			<span>Horário geral</span>
			<IconsIconMoreItems
				class="w-5"
				:class="{'-icon-green': selectedOption === ViewMode.GENERAL_SCHEDULE, '-icon-light-green': selectedOption !== ViewMode.GENERAL_SCHEDULE}"
			/>
		</div>

		<!--right button-->
		<div
			class="flex gap-2 items-center border-2 p-3 font-[600] rounded-r-lg text-[#9AB69E]"
			:class="{'active': selectedOption === ViewMode.DAILY_SCHEDULE, 'border-l-0': selectedOption !== ViewMode.DAILY_SCHEDULE}"
			@click="selectedOption = ViewMode.DAILY_SCHEDULE"
		>
			<span>Horário do dia</span>
			<IconsIconClock
				class="w-5"
				:class="{'-icon-green': selectedOption === ViewMode.DAILY_SCHEDULE, '-icon-light-green': selectedOption !== ViewMode.DAILY_SCHEDULE}"
			/>
		</div>
	</section>
</div>
</template>

<style scoped>
.active {
	border-color: #118D3B;
	background-color: #EBF8EF;
	color: #118D3B;
}
</style>