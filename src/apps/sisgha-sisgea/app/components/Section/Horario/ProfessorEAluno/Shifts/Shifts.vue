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
      'shifts__item--first': index === 0,
      'shifts__item--last': index === turnos.length - 1,
    }"
    :dias-da-semana="diasDaSemana"
    :grade-disciplinas="gradeDisciplinas"
    :turno="turno"
  />
</template>

<style scoped>
.shifts__item--first {
  border-start-start-radius: var(--ui-radius-xl);
  border-start-end-radius: var(--ui-radius-xl);
}

.shifts__item--last {
  border-end-start-radius: var(--ui-radius-xl);
  border-end-end-radius: var(--ui-radius-xl);
}
</style>
