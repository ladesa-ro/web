<script lang="ts" setup>
import type { IDiasDaSemana, ITurnos } from '../IGradeHorario';

const calendars = [
  { id: '1', title: 'Técnico em Informática' },
  { id: '2', title: 'Técnico em Informática' },
  { id: '3', title: 'Técnico em Informática' },
  { id: '4', title: 'Técnico em Informática' },
];

//

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
  <div class="flex flex-col items-center w-full gap-8 p-8">
    <SectionHorarioDapeExpansionPanels
      v-for="calendar in calendars"
      :key="calendar.id"
      :title="calendar.title"
    >
      <!-- TODO: retirar componente temporário -->
      <SectionHorarioShiftsStyled
        :dias-da-semana="diasDaSemana"
        :turnos="turnos"
      />
    </SectionHorarioDapeExpansionPanels>

    <!-- "Gerar horário" button -->
    <section class="fixed bottom-16 z-50">
      <UIButtonGenerateShedulesButtonGenerateShedule />
    </section>
  </div>
</template>
