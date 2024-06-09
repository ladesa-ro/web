<script setup lang="ts">
  import { capitalizeFirst } from './-Helpers/CapitalizeFirst';
  import { getWeekDays } from './-Helpers/GetWeekDays';
  import dayjs from './-Helpers/dayjs';
  import SpeechBubblesCalendar from './SpeechBubblesCalendar/SpeechBubblesCalendar.vue';
  import { ViewMode } from './ViewMode';
  import { ref, computed } from 'vue';
  
  // set month and week
  const selectedDay = defineModel('day', { default: dayjs() });
  
  const month = capitalizeFirst(selectedDay.value.format('MMMM'));
  
  const weekDays = getWeekDays(selectedDay.value);
  
  const firstWeekDay = weekDays[0];
  const lastWeekDay = weekDays[5];
  
  const selectedOption = defineModel('option', { default: ViewMode.DAILY_SCHEDULE });
  const notificationsButtonEl = ref(null);
  
  // State to manage arrow rotation
  const isArrowDown = ref(false);
  
  function toggleArrow() {
	isArrowDown.value = !isArrowDown.value;
  }
  </script>

<template>
	<div class="flex justify-between mt-14 max-w-screen-xl w-full mx-auto">
	  <div class="flex font-[600] items-center gap-2">
		<span>{{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}</span>
		<v-menu
		  origin="auto"
		  location="bottom center"
		  transition="slide-y-transition"
		  :close-on-content-click="false"
		>
		  <template v-slot:activator="{ props }">
			<IconsArrowIconArrow
			  v-bind="props"
			  ref="notificationsButtonEl"
			  :class="[' arrow -rotate-90 cursor-pointer -icon-green', { down: isArrowDown } ]"
			  @click="toggleArrow"
			/>
		  </template>
  
		  <SpeechBubblesCalendar :notificationsButtonEl="notificationsButtonEl" />
		</v-menu>
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
  
  .arrow {
	color: #118d3b;
	-moz-transition: all 0.5s linear;
	-webkit-transition: all 0.5s linear;
	transition: all 0.5s linear;
  }
  
  .arrow.down {
	-moz-transform: rotate(90deg);
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
  }
  </style>
  