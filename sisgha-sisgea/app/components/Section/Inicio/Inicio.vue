<script lang="ts" setup>
import { IconsClockView, IconsTeacherLesson } from '#components';
import type {
  Aula,
  DiaEditavelEmTurnos,
  HorString,
  TemposDeAula,
} from '~/composables/schedule/useScheduleTypes';
import CardLink from './CardLink/CardLink.vue';
import Section from './Section/Section.vue';

const DAPE_PATH = '/sisgha/dape';

const tempodeaula: TemposDeAula = {
  segunda: [
    { horaInicio: '07:30:00', horaFim: '08:20:00' },
    { horaInicio: '08:20:00', horaFim: '09:10:00' },
    { horaInicio: '09:10:00', horaFim: '10:00:00' },
    { horaInicio: '10:20:00', horaFim: '11:10:00' },
    { horaInicio: '11:10:00', horaFim: '12:00:00' },
  ],
};

const aulas: Omit<Aula & HorString, 'diaSemana' | 'id'>[] = [
  {
    tipo: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    horaInicio: '07:30:00',
    horaFim: '08:20:00',
    data: '2025-08-25',
  },
  {
    tipo: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    horaInicio: '08:20:00',
    horaFim: '09:10:00',
    data: '2025-08-25',
  },
  {
    tipo: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    horaInicio: '09:10:00',
    horaFim: '10:00:00',
    data: '2025-08-25',
  },
];

const teste: Ref<DiaEditavelEmTurnos> = ref({
  manha: [
    {
      id: 'easdee',
      diaSemana: 'segunda',
      tipo: 'aula',
      diario: {
        turma: '3a inf',
        professor: 'divanea',
        disciplina: 'protuges',
      },
      horaInicio: useDayJs()('09:10:00'),
      horaFim: useDayJs()('10:00:00'),
      data: useDayJs()('2025-08-25'),
    },
    {
      id: 'adteste',
      diaSemana: 'segunda',
      tipo: 'aula',
      diario: {
        turma: '3a inf',
        professor: 'divanea',
        disciplina: 'lkkkk',
      },
      horaInicio: useDayJs()('10:10:00'),
      horaFim: useDayJs()('11:00:00'),
      data: useDayJs()('2025-08-25'),
    },
  ],
  tarde: [
    {
      id: 'testee2',
      diaSemana: 'segunda',
      tipo: 'aula',
      diario: {
        turma: '3a inf',
        professor: 'dionat',
        disciplina: ' porteos instumentao',
      },
      horaInicio: useDayJs()('13:10:00'),
      horaFim: useDayJs()('14:00:00'),
      data: useDayJs()('2025-08-25'),
    },
    {
      id: '202320254 230293',
      diaSemana: 'segunda',
      tipo: 'aula',
      diario: {
        turma: '3a inf',
        professor: 'divanea',
        disciplina: 'protuges',
      },
      horaInicio: useDayJs()('14:10:00'),
      horaFim: useDayJs()('15:00:00'),
      data: useDayJs()('2025-08-25'),
    },
  ],
  noite: [
    {
      id: 'fassssssssssssss',
      diaSemana: 'segunda',
      tipo: 'aula',
      diario: {
        turma: 'sabolita',
        professor: 'diva d amusica',
        disciplina: 'budismo',
      },
      horaInicio: useDayJs()('19:10:00'),
      horaFim: useDayJs()('20:00:00'),
      data: useDayJs()('2025-08-25'),
    },
    {
      id: '2wsadas 42412',
      diaSemana: 'segunda',
      tipo: 'aula',
      diario: {
        turma: 'sabola',
        professor: 'diva da musica',
        disciplina: 'hinduinsmo',
      },
      horaInicio: useDayJs()('19:50:00'),
      horaFim: useDayJs()('23:00:00'),
      data: useDayJs()('2025-08-25'),
    },
  ],
});

const item2: Ref<DiaEditavelEmTurnos> = ref({
  manha: [
    {
      id: 'adadsa',
      diaSemana: 'terca',
      tipo: 'aula',
      diario: {
        turma: '3a inf',
        professor: 'divanea',
        disciplina: 'disciiplian foda',
      },
      horaInicio: useDayJs()('09:10:00'),
      horaFim: useDayJs()('10:00:00'),
      data: useDayJs()('2025-08-25'),
    },
    {
      id: 'p=--sd0a-s0dasd',
      diaSemana: 'terca',
      tipo: 'aula',
      diario: {
        turma: 'bargo devaiaaaaa',
        professor: 'bargo devaia dmiahi dioiona pratco haiay',
        disciplina: 'om bhur',
      },
      horaInicio: useDayJs()('10:10:00'),
      horaFim: useDayJs()('11:00:00'),
      data: useDayJs()('2025-08-25'),
    },
  ],
  tarde: [
    {
      id: 'om buhhhhr',
      diaSemana: 'terca',
      tipo: 'aula',
      diario: {
        turma: 'yeah bargo',
        professor: 'devaia',
        disciplina: 'dimahi',
      },
      horaInicio: useDayJs()('13:10:00'),
      horaFim: useDayJs()('14:00:00'),
      data: useDayJs()('2025-08-25'),
    },
    {
      id: 'pracho daya demasia himadhit',
      diaSemana: 'terca',
      tipo: 'aula',
      diario: {
        turma: 'prachooo',
        professor: 'ohmmmmm bhurrrr',
        disciplina: 'buhavavaa',
      },
      horaInicio: useDayJs()('14:10:00'),
      horaFim: useDayJs()('15:00:00'),
      data: useDayJs()('2025-08-25'),
    },
  ],
  noite: [
    {
      id: 'hhmmmm pracho',
      diaSemana: 'terca',
      tipo: 'aula',
      diario: {
        turma: 'oooouououommm',
        professor: 'tat savir',
        disciplina: 'tur vareniam',
      },
      horaInicio: useDayJs()('19:10:00'),
      horaFim: useDayJs()('20:00:00'),
      data: useDayJs()('2025-08-25'),
    },
    {
      id: 'ooooiiomim bhur',
      diaSemana: 'terca',
      tipo: 'aula',
      diario: {
        turma: 'bargo devaia dimahi',
        professor: 'divonica',
        disciplina: 'aniabola',
      },
      horaInicio: useDayJs()('19:50:00'),
      horaFim: useDayJs()('23:00:00'),
      data: useDayJs()('2025-08-25'),
    },
  ],
});
</script>

<template>
  <SectionHorarioDapeEditWeek />

  <UIContainer class="flex flex-col">
    <UITitle class="mb-7" text="Início - Acesso Rápido" />

    <Section title="Horário Acadêmico">
      <CardLink
        :to="`${DAPE_PATH}/horario`"
        :icon="IconsClockView"
        title="Visualizar Horário"
      />

      <SectionHorarioDapeGenerateModal mode="white" />
    </Section>

    <Section title="Relatórios">
      <CardLink
        :to="`${DAPE_PATH}/relatorios/aulasMinistradas`"
        :icon="IconsTeacherLesson"
        title="Aulas Ministradas"
      />
    </Section>

    <Section title="Diários">
      <CardLink
        :to="`${DAPE_PATH}/diarios`"
        :icon="IconsTeacherLesson"
        title="Diários"
      />
    </Section>
  </UIContainer>
</template>
