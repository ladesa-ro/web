<script setup lang="ts">
import type { IDiasDaSemana, ITurnos } from '../IGradeHorario';

type Props = {
  turnos: ITurnos;
  diasDaSemana: IDiasDaSemana;
};

defineProps<Props>();

const gradeDisciplinas = [
  {
    diaDaSemana: 1,
    horarios: [1],
    disciplina: 'Matemática',
    professor: 'João',
  },
  {
    diaDaSemana: 2,
    horarios: [3],
    disciplina: 'História',
    professor: 'Ana',
  },
  {
    diaDaSemana: 3,
    horarios: [1, 2, 3],
    disciplina: 'Redes',
    professor: 'Danilo',
  },
];
</script>

<template>
  <SectionHorarioShift
    v-for="(turno, index) in turnos"
    :key="turno.nome"
    :turno="turno"
    :dias-da-semana="diasDaSemana"
    :class="{
      'rounded-t-xl': index === 0,
      'rounded-b-xl': index === turnos.length - 1,
    }"
    :grade-disciplinas="gradeDisciplinas"
  />
</template>
