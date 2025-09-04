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
    canMonitor: ({ source }) => source.data.type === 'cellDraggable',

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
</script>

<template>
  <template v-for="(day, dayIndex) in weekScheduleEditable" :key="dayIndex">
    <template v-for="(shift, shiftName, shiftIndex) of day.schedule">
      <SectionHorarioDapeEditShift
        v-if="shift"
        :day-id="dayIndex"
        :turno-id="shiftIndex"
        v-model="weekScheduleEditable[dayIndex]!.schedule[shiftName]!"
        @atividade-change="weekScheduleHistory.commit()"
      />
    </template>
  </template>
</template>
