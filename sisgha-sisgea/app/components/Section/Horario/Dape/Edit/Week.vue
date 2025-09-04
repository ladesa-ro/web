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
  DiaEditavelEmTurnos,
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

      const dayScheduleId = args.source.data.dayId as number;
      const daySchedule = weekScheduleEditable.value[dayScheduleId]?.schedule;

      if (!daySchedule || !dropTarget) {
        console.warn('daySchedule = ' + daySchedule);
        return;
      }

      const startShiftId = args.source.data.turnoId as number;
      const finishShiftId = args.location.current.dropTargets[1]?.data
        .id as number;

      const startShift = Object.values(daySchedule).find(
        shift => shift.find(cell => cell.turnoId === startShiftId) !== undefined
      );

      let finishShift;

      if (startShiftId != finishShiftId) {
        finishShift = Object.values(daySchedule).find(
          shift =>
            shift.find(cell => cell.turnoId === finishShiftId) !== undefined
        );
      } else {
        finishShift = startShift;
      }

      if (!startShift || !finishShift) {
        console.warn('startShift = ' + JSON.stringify(startShift));
        console.warn('finishShift = ' + finishShift);
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

      if (indexOfTarget < 0) {
        console.warn('indexOfTarget = ' + indexOfTarget);
        return;
      }

      if (startShiftId != finishShiftId) {
        const startKey = Object.keys(daySchedule)[startShiftId - 1];
        const finishKey = Object.keys(daySchedule)[finishShiftId - 1];

        if (!startKey || !finishKey) {
          console.warn('startKey = ', startKey);
          console.warn('finishKey = ', finishKey);
          return;
        }

        const draggedItem = startShift.splice(startIndex, 1)[0];

        if (!draggedItem) {
          console.warn('draggedItem = ' + draggedItem);
          return;
        }

        draggedItem.turnoId = finishShiftId;

        const finishShift = daySchedule[finishKey];

        if (!finishShift) {
          console.warn('finishShift = ' + finishShift);
          return;
        }

        finishShift.splice(indexOfTarget, 0, draggedItem);
      } else {
        const key = Object.keys(daySchedule)[startShiftId];

        if (!key) {
          console.warn('key = ' + key);
          return;
        }

        daySchedule[key] = reorderWithEdge({
          list: startShift,
          startIndex,
          indexOfTarget,
          closestEdgeOfTarget: closestEdge,
          axis: 'vertical',
        });
      }

      weekScheduleEditable.value[dayScheduleId]!.schedule = daySchedule;
    },
  });
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div v-for="(day, dayIndex) in weekScheduleEditable" :key="dayIndex">
    <template v-for="(shift, shiftName, shiftIndex) of day.schedule">
      <SectionHorarioDapeEditShift
        v-if="shift"
        :day-id="dayIndex"
        :turno-id="shiftIndex"
        v-model="weekScheduleEditable[dayIndex]!.schedule[shiftName]!"
        @atividade-change="weekScheduleHistory.commit()"
      />
    </template>
  </div>
</template>
