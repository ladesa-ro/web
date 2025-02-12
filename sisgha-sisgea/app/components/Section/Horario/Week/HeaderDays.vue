<script lang="ts" setup>
import type { IDiasDaSemana } from '../IGradeHorario';

type Props = {
  diasDaSemana: IDiasDaSemana;
};

defineProps<Props>();
</script>

<template>
  <SectionHorarioWeekHeaderDay
    v-for="diaDaSemana in diasDaSemana"
    :key="diaDaSemana.nome"
    :dia-da-semana="diaDaSemana"
  />
</template>
