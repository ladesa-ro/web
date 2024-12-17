<script setup lang="ts">
import { computed, ref } from 'vue';
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


const gradeDisciplinas = [
  { diaDaSemana: 1, horarios: [1], disciplina: 'Matemática', professor: 'Prof. Joo', turno: 'Matutino' },
  { diaDaSemana: 1, horarios: [2], disciplina: 'Física', professor: 'Prof. João', turno: 'Noturno' },
  { diaDaSemana: 1, horarios: [3], disciplina: 'Programação Web', professor: 'Prof. João', turno: 'Vespertino' },
];

const professoresEmTresTurnos = computed(() => {
  const turnosPorProfessor: Record<string, Set<string>> = {};

  gradeDisciplinas.forEach(({ professor, turno }) => {
    if (!turnosPorProfessor[professor]) {
      turnosPorProfessor[professor] = new Set();
    }
    turnosPorProfessor[professor].add(turno);
  });

  return Object.keys(turnosPorProfessor).filter(
    (professor) => turnosPorProfessor[professor].size === 3
  );
});

const showAlert = computed(() => professoresEmTresTurnos.value.length > 0);

const activeCalendar = ref<any[]>([]);
const calendars = [
  { id: '1', title: 'Técnico em Informatica' },
  { id: '2', title: 'Técnico em Informatica' },
  { id: '3', title: 'Técnico em Informatica' },
  { id: '4', title: 'Técnico em Informatica' },
];
</script>


<template>
  <div v-if="showAlert" class="alert-container">
    <v-alert type="warning" class="mr-0 alert-box">
      Professor(es) {{ professoresEmTresTurnos.join(', ') }} cadastrado(s) em três turnos!
    </v-alert>
  </div>

  <v-expansion-panels
  multiple
  v-model="activeCalendar"
  class="calendario-expansion-panels gap-3 px-8 py-8"
  :class="{
    'mt-20': professoresEmTresTurnos.length > 0,  
  }"
>

    <v-expansion-panel
      v-for="calendar in calendars"
      :key="calendar.id"
      :value="calendar.id"
      class="calendario-expansion-panel !bg-ldsa-bg border-2 border-ldsa-grey overflow-hidden"
      :class="{
        'border-4 border-orange-500': professoresEmTresTurnos.length > 0
      }"
    >
      <v-expansion-panel-title
        class="!bg-ldsa-green-1 !rounded-none"
        :hide-actions="true"
      >
        <div>
          <p class="text-white">{{ calendar.title }}</p>
          <br /><br />
          <p class="text-[#b7d1b8]">Editado há 3 horas</p>
        </div>
      </v-expansion-panel-title>

      <v-expansion-panel-text class="overflow-x-auto overflow-y-hidden">
        <div class="mx-auto w-max">
          <div class="grade-horario px-6 mt-2 w-full overflow-visible">
            <SectionHorarioShifts
              :turnos="turnos"
              :dias-da-semana="diasDaSemana"
            />
          </div>
        </div>
      </v-expansion-panel-text>

      <v-expansion-panel-title
        :hide-actions="true"
        class="text-ldsa-green-1 flex justify-center"
      >
        <IconsArrowIconArrow
          :class="{
            'rotate-90': activeCalendar.includes(calendar.id),
            '-rotate-90': !activeCalendar.includes(calendar.id),
          }"
        />
      </v-expansion-panel-title>
    </v-expansion-panel>

    <!-- "Gerar horário" button -->
    <section class="fixed bottom-16 z-50">
      <UIButtonGenerateShedulesButtonGenerateShedule/>
    </section>
  </v-expansion-panels>
</template>

<style scoped>
.alert-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 10%; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999; 
  width: auto;
  padding: 0 16px; 
  margin-top: 7px;
}

.alert-box {
  max-width: 600px; 
  width: 100%; 
  margin: 0 auto;
}

.grade-horario {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: max-content max-content repeat(
      6,
      minmax(11.25rem, 1fr)
    );
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 0;
}
</style>




<style>
.calendario-expansion-panels .calendario-expansion-panel,
.calendario-expansion-panels.v-expansion-panels:not(
    .v-expansion-panels--variant-accordion
  )
  > :is(
    :first-child:not(:last-child):not(.v-expansion-panel--active):not(
        .v-expansion-panel--before-active
      ),
    :not(:first-child):not(:last-child):not(.v-expansion-panel--active):not(
        .v-expansion-panel--after-active
      ),
    :last-child:not(:first-child):not(.v-expansion-panel--active):not(
        .v-expansion-panel--after-active
      ),
    :not(:first-child):not(:last-child):not(.v-expansion-panel--active):not(
        .v-expansion-panel--before-active
      )
  ) {
  border-radius: 0.5rem !important;
}
</style>
