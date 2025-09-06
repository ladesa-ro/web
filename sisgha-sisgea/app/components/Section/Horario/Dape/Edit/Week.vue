<script setup lang="ts">
import {
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useRefHistory } from '@vueuse/core';
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '~/composables/schedule/EXEMPLO';
import type {
  Aula,
  DiaEditavelEmTurnos,
  HorDayjs,
  Vago,
  WeekSchedule,
} from '~/composables/schedule/useScheduleTypes';
import { useWeekSchedule } from '~/composables/schedule/useWeekSchedule';
import { canSwap, swapCells } from './swapCells';

const { editMode, showBreaks: showBreaksProps } = defineProps<{
  editMode?: boolean;
  showBreaks?: boolean;
}>();

const showBreaks = computed(() => (editMode ? false : showBreaksProps));

provide('showBreaks', showBreaks);

const weekSchedule = ref(
  useWeekSchedule(temposDeAulaExemplo, aulasSemDiaSemanaExemplo)
) as Ref<WeekSchedule>;

const weekScheduleHistory = useRefHistory(weekSchedule, {
  deep: true,
  capacity: 10,
});

type WeekScheduleEditable = {
  data: string;
  schedule: DiaEditavelEmTurnos;
}[];

const weekScheduleEditable: Ref<WeekScheduleEditable> = ref(
  [...weekSchedule.value.entries()].map(([dayMeta, daySchedule]) => ({
    data: dayMeta.data,
    schedule: daySchedule,
  }))
);

// Maps arrent reactive in vue, so is necessary to watch for changes in the editable array and update the original Map
watch(
  weekScheduleEditable,
  newVal => {
    weekSchedule.value.forEach((_, dayMeta) => {
      const changedDay = newVal.find(val => val.data === dayMeta.data);

      if (changedDay) {
        weekSchedule.value.set(dayMeta, changedDay.schedule);
      }
    });
  },
  { deep: true }
);

//

const closestEdgeToElement: Ref<Edge | null> = ref(null);

let cleanup = () => {};

onMounted(() => {
  cleanup = monitorForElements({
    canMonitor: ({ source }) =>
      source.data.type === 'cellDraggable' && editMode,

    onDrag: ({ location }) => {
      const dropTarget = location.current.dropTargets[0];
      if (dropTarget) {
        const closestEdge = extractClosestEdge(dropTarget.data);
        closestEdgeToElement.value = closestEdge;
      }
    },

    onDrop: args => {
      const dropTarget = args.location.current.dropTargets[0];

      const startDayScheduleId = args.source.data.dayId as number;
      const startDaySchedule =
        weekScheduleEditable.value[startDayScheduleId]?.schedule;

      if (!startDaySchedule || !dropTarget) {
        console.warn('startDaySchedule = ' + startDaySchedule);
        return;
      }

      //

      const startShiftId = args.source.data.turnoId as number;
      const finishShiftId = args.location.current.dropTargets[1]?.data
        .id as number;

      const startShift: ((Aula | Vago) & HorDayjs)[] | undefined =
        Object.values(startDaySchedule).find(shift =>
          shift.some(cell => cell.turnoId === startShiftId)
        );

      let finishShift: ((Aula | Vago) & HorDayjs)[] | undefined;

      if (startShiftId != finishShiftId) {
        const finishDaySchedule =
          weekScheduleEditable.value[dropTarget.data.dayId as number]?.schedule;

        if (!finishDaySchedule) {
          console.warn('finishDaySchedule = ' + finishDaySchedule);
          return;
        }

        finishShift = Object.values(finishDaySchedule).find(
          shift =>
            Array.isArray(shift) &&
            shift.some(cell => cell.turnoId === finishShiftId)
        );
      } else {
        finishShift = startShift;
      }

      if (!startShift || !finishShift) {
        console.warn('startShift = ' + JSON.stringify(startShift));
        console.warn('finishShift = ' + JSON.stringify(finishShift));
        return;
      }

      const startIndex = startShift.findIndex(
        shift => shift.id == args.source.data.id
      );

      const closestEdge = extractClosestEdge(dropTarget.data);

      if (startIndex === -1 || !closestEdge) {
        console.warn('closestEdge do drop = ' + closestEdge);
        console.warn('startIndex = ' + startIndex);
        return;
      }

      const indexOfTarget = finishShift.findIndex(
        horario => horario.id === dropTarget.data.id
      );

      if (indexOfTarget === -1) {
        console.warn('indexOfTarget = ' + indexOfTarget);
        console.log(
          'finishShift = ' + JSON.stringify(finishShift.map(h => h.turnoId))
        );
        return;
      }

      if (startShiftId != finishShiftId) {
        const startKey = Object.keys(startDaySchedule)[startShiftId];
        const finishKey = Object.keys(startDaySchedule)[finishShiftId];

        if (!startKey || !finishKey) {
          console.warn('startKey = ', startKey);
          console.warn('finishKey = ', finishKey);
          return;
        }

        const draggedItem: (Aula & HorDayjs) | (Vago & HorDayjs) | undefined =
          startShift.splice(startIndex, 1)[0];

        if (!draggedItem) {
          console.warn('draggedItem = ' + draggedItem);
          return;
        }

        draggedItem.turnoId = finishShiftId;

        finishShift.splice(indexOfTarget, 0, draggedItem);
      } else {
        const key = Object.keys(startDaySchedule)[startShiftId];

        if (!key) {
          console.warn('key = ' + key);
          return;
        }

        startDaySchedule[key] = reorderWithEdge({
          list: startShift,
          startIndex,
          indexOfTarget,
          closestEdgeOfTarget: closestEdge,
          axis: 'vertical',
        });
      }

      weekScheduleEditable.value[startDayScheduleId]!.schedule =
        startDaySchedule;
    },
  });
});

onUnmounted(() => {
  cleanup();
});

const getRowShiftName = (rowShift: string) => {
  switch (rowShift) {
    case 'manha':
      return 'Matutino';
    case 'tarde':
      return 'Vespertino';
    case 'noite':
      return 'Noturno';
  }
};
</script>

<template>
  <button
    @click="swapCells(ref(weekSchedule), weekScheduleHistory)"
    :disabled="!canSwap"
    class="disabled:opacity-50 border-ldsa-grey border-2 rounded-lg max-w-max"
  >
    Fazer troca
  </button>

  <div
    v-for="(rowShift, rowShiftIndex) in ['manha', 'tarde', 'noite']"
    class="flex justify-center mb-5"
  >
    <div
      class="bg-ldsa-green-1 text-center vertical-text text-ldsa-white p-1 font-medium"
      :class="[
        rowShiftIndex === 0 && 'rounded-br-lg',
        rowShiftIndex === 2 && 'rounded-tr-lg',
      ]"
    >
      {{ getRowShiftName(rowShift) }}
    </div>

    <div
      class="grid grid-cols-[auto_repeat(6,1fr)] place-items-center border-2 border-ldsa-green-1 py-2 px-5 gap-5"
      :class="[
        rowShiftIndex === 0 && 'rounded-tr-lg',
        rowShiftIndex === 2 && 'rounded-br-lg',
      ]"
    >
      <div class="flex flex-col w-10 h-full justify-start text-center">
        <!-- TODO: pegar os horários do array de tempos de aula -->
        <span
          v-for="cell in weekScheduleEditable[0]?.schedule[rowShift]"
          v-show="
            showBreaks ? true : cell.tipo === 'aula' || cell.tipo === 'vago'
          "
          class="border-b-ldsa-text-default/65 text-[0.813rem] font-medium last:border-b-transparent not-last:border-b-[0.119565rem] border-t-solid border-t-transparent last:mb-[1.5px] flex-1 flex items-center justify-center"
          :class="
            cell.tipo !== 'aula' &&
            cell.tipo !== 'vago' &&
            'bg-ldsa-grey/20 text-ldsa-text-default/50'
          "
        >
          {{ cell.horaInicio.format('hh:mm') }}
        </span>
      </div>

      <template v-for="(day, dayIndex) in weekScheduleEditable">
        <template
          v-for="(_, shiftName, shiftIndex) in Object.fromEntries(
            Object.entries(day.schedule).filter(([key]) => key === rowShift)
          )"
        >
          <SectionHorarioDapeEditShift
            :day-id="dayIndex"
            :turno-id="shiftIndex"
            :editMode
            v-model="weekScheduleEditable[dayIndex]!.schedule[shiftName]!"
            @atividade-change="weekScheduleHistory.commit()"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.vertical-text {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}
</style>
