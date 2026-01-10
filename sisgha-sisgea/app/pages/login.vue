<script lang="ts" setup>
import { useManualRefHistory } from '@vueuse/core';
import ButtonsEditMode from '../components/Section/Horario/Dape/ScheduleQuery/Buttons/ButtonsEditMode.vue';
import ButtonsVisualizationMode from '../components/Section/Horario/Dape/ScheduleQuery/Buttons/ButtonsVisualizationMode.vue';
import Button from '../components/Section/Horario/Dape/ScheduleQuery/Buttons/ScheduleQueryButton.vue';
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '../composables/schedule/EXEMPLO';
import type { WeekSchedule } from '../composables/schedule/useScheduleTypes';
import { useWeekSchedule } from '../composables/schedule/useWeekSchedule';

definePageMeta({
  layout: 'empty',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const weekSchedule: Ref<WeekSchedule> = ref(
  useWeekSchedule(temposDeAulaExemplo, aulasSemDiaSemanaExemplo)
) as Ref<WeekSchedule>;

const { undo, redo, canRedo, canUndo, commit } = useManualRefHistory(
  weekSchedule,
  { clone: true, capacity: 10 }
);

const showBreaks = ref(true);
const editMode = ref(false);

provide('showBreaks', showBreaks);
provide('editMode', editMode);
</script>

<template>
  <ButtonsVisualizationMode />

  <ButtonsEditMode>
    <Button :disabled="!canUndo" @click="undo()">
      <IconsUndoRedo class="w-4 scale-x-[-1]" />
    </Button>

    <Button :disabled="!canRedo" @click="redo()">
      <IconsUndoRedo class="w-4" />
    </Button>
  </ButtonsEditMode>

  <SectionHorarioDapeNewEditWeek v-model="weekSchedule" :commit="commit" />
</template>
