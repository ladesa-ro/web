<script lang="ts" setup>
import type { ITurno } from '../IGradeHorario';

type Props = {
  turno: ITurno;
};

const props = defineProps<Props>();
</script>

<template>
  <p
    :style="{ gridRow: `span ${props.turno.horarios.length}` }"
    class="turno col-start-1 block font-medium text-ldsa-white w-11 text-center content-center bg-ldsa-green-1"
  >
    {{ turno.nome }}
  </p>
</template>
