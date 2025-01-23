<script setup lang="ts">
import type { IDiasDaSemana, ITurnos } from '../IGradeHorario';

type Props = {
  turnos: ITurnos;
  diasDaSemana: IDiasDaSemana;
};

defineProps<Props>();
</script>

<template>
  <SectionHorarioShift
    v-for="(turno, index) in turnos"
    :key="turno.nome"
    :turno="turno"
    :dias-da-semana="diasDaSemana"
    :class="{
      'rounded-t-[12px]': index === 0,
      'rounded-b-[12px]': index === turnos.length - 1,
    }"
    :grade-disciplinas="[
      {
        diaDaSemana: 1,
        horarios: [1],
        disciplina: 'Matemática',
        professor: 'Prof. João',
      },
      {
        diaDaSemana: 2,
        horarios: [3],
        disciplina: 'História',
        professor: 'Prof. Ana',
      },
      {
        diaDaSemana: 3,
        horarios: [1, 2, 3],
        disciplina: 'Redes de Computadores',
        professor: 'Prof. Danilo',
      },
    ]"
  />
</template>
