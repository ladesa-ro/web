<script setup lang="ts">
import type { IDiasDaSemana, ITurnos } from '../IGradeHorario';

type Props = {
  turnos: ITurnos;
  diasDaSemana: IDiasDaSemana;
};

defineProps<Props>();
</script>

<template>
  <div class="grade-horario text-ldsa-text-default">
    <SectionHorarioShifts :turnos="turnos" :dias-da-semana="diasDaSemana" />
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
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 0;
}
</style>
