<script setup lang="ts">
import { capitalizeFirst } from './-Helpers/CapitalizeFirst';
import { getWeekDays } from './-Helpers/GetWeekDays';
import dayjs from './-Helpers/dayjs';

const selectedDay = defineModel({
	default: dayjs(),
});

const month = capitalizeFirst(selectedDay.value.format('MMMM'));

const weekDays = getWeekDays(selectedDay.value);

const firstWeekDay = weekDays[0];
const lastWeekDay = weekDays[5];
</script>

<template>
	<div>
		<v-container class="flex justify-between mt-14">
			<span class="flex font-[600] items-center gap-2 ml-14">
				{{ month }} - dias {{ firstWeekDay.day }} a
				{{ lastWeekDay.day }}
				<IconsArrowIconArrow
					class="-rotate-90 cursor-pointer -icon-green"
				/>
			</span>
			<div class="flex cursor-pointer">
				<span
					class="flex gap-1 items-center border-2 border-[#118D3B] text-[#118D3B] bg-[#EBF8EF] p-3 font-[600] rounded-l-lg"
				>
					Horário geral
					<IconsIconMoreItems class="ml-1 w-5 -icon-green" />
				</span>
				<span
					class="flex gap-1 items-center border-2 border-[#9AB69E] text-[#9AB69E] p-3 font-[600] border-l-0 rounded-r-lg"
				>
					Horário do dia
					<IconsIconClock class="ml-1 w-5 -icon-light-green" />
				</span>
			</div>
		</v-container>
	</div>
</template>
