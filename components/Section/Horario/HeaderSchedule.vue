<script setup lang="ts">
import { capitalizeFirst } from './-Helpers/CapitalizeFirst';
import { getWeekDays } from './-Helpers/GetWeekDays';
import dayjs from './-Helpers/dayjs';

//set month and week
const selectedDay = defineModel('day', { default: dayjs() });

const month = capitalizeFirst(selectedDay.value.format('MMMM'));

const weekDays = getWeekDays(selectedDay.value);

const firstWeekDay = weekDays[0];
const lastWeekDay = weekDays[5];

const selectedOption = defineModel('option', { default: 2 })
</script>

<template>
<v-container class="flex justify-between mt-14">
	<div class="flex font-[600] items-center gap-2">
		{{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}
		<IconsArrowIconArrow
			class="-rotate-90 cursor-pointer -icon-green"
		/>
	</div>


	<section class="flex cursor-pointer">
		<!--left button-->
		<div
			class="flex gap-1 items-center border-2 p-3 font-[600] rounded-l-lg text-[#9AB69E]"
			:class="{'active': selectedOption === 1, 'border-r-0': selectedOption !== 1}">

			<input
				type="radio"
				name="options"
				value="1"
				@click="selectedOption = 1"
				:checked="selectedOption === 1"
			>

			<p>Horário geral</p>
			<IconsIconMoreItems
				class="ml-1 w-5"
				:class="{'-icon-green': selectedOption === 1, '-icon-light-green': selectedOption !== 1}"
			/>
		</div>

		<!--right button-->
		<div
			class="flex gap-1 items-center border-2 p-3 font-[600] rounded-r-lg text-[#9AB69E]"
			:class="{'active': selectedOption === 2, 'border-l-0': selectedOption !== 2}">

			<input
				type="radio"
				name="options"
				value="2"
				@click="selectedOption = 2"
				:checked="selectedOption === 2"
			>

			<p>Horário do dia</p>
			<IconsIconClock
				class="ml-1 w-5"
				:class="{'-icon-green': selectedOption === 2, '-icon-light-green': selectedOption !== 2}"
			/>
		</div>
	</section>
</v-container>
</template>

<style scoped>
.active {
	border-color: #118D3B;
	background-color: #EBF8EF;
	color: #118D3B;
}

/* input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: blue;
  display: inline;
  width: 100%;
  height: 100%;
  padding: 1px;
} */

/* div.button:has(input[type="radio"]:checked) {
	border-color: #118D3B;
	background-color: #EBF8EF;
	color: #118D3B;
} */
</style>