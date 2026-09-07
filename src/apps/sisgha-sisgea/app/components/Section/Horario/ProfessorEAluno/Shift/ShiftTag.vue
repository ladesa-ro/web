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
    class="turno shift-tag u-font-medium u-text-center"
  >
    {{ turno.nome }}
  </p>
</template>

<style scoped>
.shift-tag {
  display: block;
  grid-column-start: 1;
  width: 2.75rem;
  align-content: center;
  color: var(--ladesa-white-color);
  background-color: var(--ladesa-green-1-color);
}
</style>
