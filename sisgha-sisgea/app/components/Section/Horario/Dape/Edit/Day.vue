<script setup lang="ts">
import { type DiaEditavelEmTurnos } from '~/composables/schedule/useScheduleTypes';

defineProps<{ dayId: number }>();

const daySchedule = defineModel<DiaEditavelEmTurnos>({
  default: () => ({}),
  required: true,
});

defineEmits(['atividade-change']);
</script>

<template>
  <template v-for="(_, key, index) in daySchedule">
    <SectionHorarioDapeEditShift
      v-if="daySchedule[key]"
      :day-id="dayId"
      :turno-id="index"
      v-model="daySchedule[key]"
      @atividade-change="$emit('atividade-change')"
    />
  </template>
</template>
