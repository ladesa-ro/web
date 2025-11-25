<script lang="ts" setup>
import type { IDiaDaSemana } from '../IGradeHorario';

type Props = {
  diaDaSemana: IDiaDaSemana;
};

defineProps<Props>();
</script>

<template>
  <div
    class="bg-ldsa-green-1 text-ldsa-white px-4 py-2 text-center content-center rounded-t-lg"
  >
    <span class="text-nowrap">
      {{ diaDaSemana.nome }}
    </span>
  </div>
</template>
