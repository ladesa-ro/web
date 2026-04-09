<script lang="ts" setup>
import type {
  IDiasDaSemana,
  IGradeDisciplina,
  ITurnos,
} from '../IGradeHorario';

type Props = {
  turnos: ITurnos;
  diasDaSemana: IDiasDaSemana;
  gradeDisciplinas: IGradeDisciplina[];
};

defineProps<Props>();
</script>

<template>
  <SectionHorarioProfessorEAlunoShift
    v-for="(turno, index) in turnos"
    :key="turno.nome"
    :class="{
      'rounded-t-xl': index === 0,
      'rounded-b-xl': index === turnos.length - 1,
    }"
    :dias-da-semana="diasDaSemana"
    :grade-disciplinas="gradeDisciplinas"
    :turno="turno"
  />
</template>
