<script setup>
import { ref } from 'vue';
import IconArrow from '~/components/Icons/Arrow/IconArrow.vue';
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
const turnos = [
	{
		nome: 'Matutino',
		horarios: [
			{ hora: '07:30', tipo: 'aula' },
			{ hora: '08:20', tipo: 'aula' },
			{ hora: '09:10', tipo: 'aula' },
			{ hora: '10:00', tipo: 'intervalo' },
			{ hora: '10:20', tipo: 'aula' },
			{ hora: '11:10', tipo: 'aula' },
		],
	},
	{
		nome: 'Vespertino',
		horarios: [
			{ hora: '13:00', tipo: 'aula' },
			{ hora: '13:50', tipo: 'aula' },
			{ hora: '14:40', tipo: 'aula' },
			{ hora: '15:30', tipo: 'intervalo' },
			{ hora: '15:50', tipo: 'aula' },
			{ hora: '16:40', tipo: 'aula' },
		],
	},
	{
		nome: 'Noturno',
		horarios: [
			{ hora: '19:00', tipo: 'aula' },
			{ hora: '19:50', tipo: 'aula' },
			{ hora: '20:40', tipo: 'aula' },
			{ hora: '21:30', tipo: 'intervalo' },
			{ hora: '21:50', tipo: 'aula' },
			{ hora: '22:40', tipo: 'aula' },
		],
	},
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
		<IconArrow class="cursor-pointer" @click="changeDay(-1)" />
		<div>
			<span class="font-medium">
				{{ selectedOptions?.value }}
			</span>
		</div>
		<IconArrow class="cursor-pointer rotate-180" @click="changeDay(1)" />
	</div>

	<section class="flex justify-between mt-10">
		<div>
			<span>Matutino</span>
			<v-checkbox
				hide-details
				density="compact"
				color="success"
				label="Manhã"
				v-for="i in 7"
			/>
		</div>
		<div>
			<span>Vespertino</span>
			<v-checkbox
				hide-details
				density="compact"
				color="success"
				label="Manhã"
				v-for="i in 7"
			/>
		</div>
		<div>
			<span>Noturno</span>
			<v-checkbox
				hide-details
				density="compact"
				color="success"
				label="Manhã"
				v-for="i in 7"
			/>
		</div>
	</section>
</template>
