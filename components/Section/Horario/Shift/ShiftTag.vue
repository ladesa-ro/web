<script setup lang="ts">
import type { ITurno } from '../IGradeHorario';

type Props = {
  turno: ITurno;
};

defineProps<Props>();
</script>

<template>
  <p
    class="turno col-start-1 row-span-6 block font-medium text-ldsa-white h-[205px] w-11 text-center content-center bg-ldsa-green-1"
  >
    {{ turno.nome }}
  </p>
</template>
