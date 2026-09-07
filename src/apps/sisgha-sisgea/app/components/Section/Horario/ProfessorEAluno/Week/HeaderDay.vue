<script lang="ts" setup>
import type { IDiaDaSemana } from '../IGradeHorario';

type Props = {
  diaDaSemana: IDiaDaSemana;
};

defineProps<Props>();
</script>

<template>
  <div class="header-day u-px-4 u-py-2 u-text-center">
    <span class="header-day__label">
      {{ diaDaSemana.nome }}
    </span>
  </div>
</template>

<style scoped>
.header-day {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  align-content: center;
  border-top-left-radius: var(--ui-radius-lg);
  border-top-right-radius: var(--ui-radius-lg);
}

.header-day__label {
  white-space: nowrap;
}
</style>
