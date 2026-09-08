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
  <div class="grade-horario">
    <SectionHorarioProfessorEAlunoShifts
      :dias-da-semana="diasDaSemana"
      :turnos="turnos"
      :grade-disciplinas="gradeDisciplinas"
    />
  </div>
</template>

<style scoped>
.grade-horario {
  display: grid;

  column-gap: 1rem;
  grid-template-columns: max-content max-content repeat(
      6,
      minmax(11.25rem, 1fr)
    );
  color: var(--ladesa-text-default-color);
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 0;
}
</style>
