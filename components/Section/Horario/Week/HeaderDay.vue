<script setup lang="ts">
import type { IDiaDaSemana } from '../IGradeHorario';

type Props = {
  diaDaSemana: IDiaDaSemana;
};

defineProps<Props>();
</script>

<template>
  <div
    class="bg-[#338e52] text-white px-4 py-2 text-center content-center rounded-t-lg"
  >
    <span class="text-nowrap">
      {{ diaDaSemana.nome }}
    </span>
  </div>
</template>
