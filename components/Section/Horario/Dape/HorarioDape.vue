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
const isExpanded = ref(Array(4).fill(false));

function toggleExpansion(index: number) {
  isExpanded.value[index] = !isExpanded.value[index];
}
</script>

<template>
  <v-expansion-panels class="gap-3 px-8 mt-8">
    <v-expansion-panel
      v-for="(item, index) in 4"
      :key="index"
      v-model="isExpanded[index]"
      class="border-2 border-[#B2D2B7] rounded-lg"
    >
      <v-expansion-panel-title
        class="!bg-[#118D3B]"
        :hide-actions="true"
        @click="toggleExpansion(index)"
      >
        <p>
          <span class="text-white">Técnico em Informatica </span><br /><br />
          <span class="text-[#b7d1b8]">Editado há 3 horas</span>
        </p>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="overflow-auto">
        <div class="grade-horario">
          <SectionHorarioShifts
            :turnos="turnos"
            :dias-da-semana="diasDaSemana"
          />
        </div>
      </v-expansion-panel-text>
      <v-expansion-panel-title
        :hide-actions="true"
        class="text-[#118D3B] flex justify-center"
        @click="toggleExpansion(index)"
      >
        <IconsArrowIconArrow
          :class="{
            'rotate-90': isExpanded[index],
            '-rotate-90': !isExpanded[index],
          }"
        />
      </v-expansion-panel-title>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style scoped>
.grade-horario {
  display: grid;
  justify-content: center;
  column-gap: 1rem;
  grid-template-columns: max-content max-content repeat(6, 11.25rem);
}
</style>
