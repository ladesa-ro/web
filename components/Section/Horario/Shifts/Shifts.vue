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
  />
</template>
