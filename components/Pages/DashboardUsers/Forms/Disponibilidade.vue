<script setup>
import { ref } from 'vue';
import IconAfterDays from '~/components/Icons/IconAfterDays.vue';
import IconBeforeDays from '~/components/Icons/IconBeforeDays.vue';

const selectedOptions = ref();

const options = [
	{ value: 'Domingo' },
	{ value: 'Segunda' },
	{ value: 'Terça' },
	{ value: 'Quarta' },
	{ value: 'Quinta' },
	{ value: 'Sexta' },
	{ value: 'Sábado' },
];

selectedOptions.value = options[1];

let currentDayIndex = ref(1);

const changeDay = (delta) => {
	currentDayIndex.value =
		(currentDayIndex.value + delta + options.length) % options.length;

	selectedOptions.value = options[currentDayIndex.value];
};
</script>

<template>
	<div class="flex justify-between items-center mt-5">
			<IconBeforeDays class="cursor-pointer" @click="changeDay(-1)" />
		<div>
			<span class="font-medium">
				{{ selectedOptions?.value }}
			</span>
		</div>
			<IconAfterDays class="cursor-pointer" @click="changeDay(1)" />
	</div>

<v-checkbox
	hide-details
	density="compact"
	color="success"
	label="Manhã"
	v-for="i in 7"
/>
</template>

<style>
.initmodal2,
.contentModal {
	display: flex;
	align-items: center;
	gap: 50px;
	display: flex;
	align-items: center;
	gap: 50px;
}

.iconWrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 30px;
	margin-left: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 30px;
	margin-left: 60px;
}

.iconB,
.iconA {
	cursor: pointer;
	cursor: pointer;
}

.iconA {
	margin-left: 70px;
	margin-left: 70px;
}
.contentModal {
	margin-top: 40px;
	margin-top: 40px;
}

.elementHours {
	content: '';
	height: 2px;
	width: auto;
	background-color: #9ab69e;
	margin-top: 2px;
	margin-bottom: 8px;
	content: '';
	height: 2px;
	width: auto;
	background-color: #9ab69e;
	margin-top: 2px;
	margin-bottom: 8px;
}

.hoursMorning {
	margin-left: 10px;
	margin-left: 10px;
}
</style>
