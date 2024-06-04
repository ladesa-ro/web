<script setup lang="ts">
import type { IDiasDaSemana, ITurnos } from '../IGradeHorario';

const diasDaSemana: IDiasDaSemana = [
	{ nome: 'Segunda' },
	{ nome: 'Terça' },
	{ nome: 'Quarta' },
	{ nome: 'Quinta' },
	{ nome: 'Sexta' },
	{ nome: 'Sábado' },
];

const turnos: ITurnos = [
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
</script>
<template>
	<div class="pb-16">
		<!-- <SectionHorarioHeaderSchedule /> -->

		<div class="grade-horario ml-10">
			<div class="col-start-1 col-span-2"></div>

			<!-- cédulas verdes dos dias da semana -->
			<div class="grid grid-cols-subgrid col-span-6">
				<SectionHorarioWeekHeaderDays :dias-da-semana="diasDaSemana" />
			</div>

			<SectionHorarioShifts
				:turnos="turnos"
				:dias-da-semana="diasDaSemana"
			/>
		</div>
	</div>
</template>

<style scoped>
.grade-horario {
	display: grid;

	column-gap: 16px;
	grid-template-columns: min-content min-content repeat(6, 180px) min-content;

	grid-auto-rows: auto;
}
</style>
