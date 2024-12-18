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

const activeCalendar = ref<any[]>([]);

const calendars = [
  {
    id: '1',
    title: 'Técnico em Informática',
  },
  {
    id: '2',
    title: 'Técnico em Informática',
  },
  {
    id: '3',
    title: 'Técnico em Informática',
  },
  {
    id: '4',
    title: 'Técnico em Informática',
  },
];
</script>

<template>
  <section class="flex flex-col items-center w-[100%]">
    <v-expansion-panels
      v-model="activeCalendar"
      multiple
      class="calendario-expansion-panels gap-7 px-8 py-8"
    >
      <v-expansion-panel
        v-for="calendar in calendars"
        :key="calendar.id"
        :value="calendar.id"
        class="calendario-expansion-panel !bg-ldsa-bg border-2 border-ldsa-grey overflow-hidden"
      >
        <v-expansion-panel-title
          class="!bg-ldsa-green-1 !rounded-none !min-h-20"
          :hide-actions="true"
        >
          <div>
            <p class="text-ldsa-white">{{ calendar.title }}</p>
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
          class="text-ldsa-green-1 flex justify-center !min-h-5"
        >
          <IconsArrowIconArrow
            :class="{
              'rotate-90': activeCalendar.includes(calendar.id),
              '-rotate-90': !activeCalendar.includes(calendar.id),
            }"
          />
        </v-expansion-panel-title>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- "Gerar horário" button -->
    <section class="fixed bottom-16 z-50">
      <UIButtonGenerateShedulesButtonGenerateShedule />
    </section>
  </section>
</template>

<style scoped>
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
