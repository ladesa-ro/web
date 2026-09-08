<script lang="ts" setup>
import type { ScheduleShift } from './schedule';

export type ScheduleShiftTagProps = {
  turno: ScheduleShift;
};

const props = defineProps<ScheduleShiftTagProps>();
</script>

<template>
  <p
    class="ui-schedule-shift-tag u-font-medium u-text-center"
    :style="{ gridRow: `span ${props.turno.horarios.length}` }"
  >
    {{ turno.nome }}
  </p>
</template>
