<script setup lang="ts">
import {
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useRefHistory } from '@vueuse/core';
import { type DiaEditavelEmTurnos } from '~/composables/schedule/useScheduleTypes';
import { canSwap, swapCells } from './swapCells';

const shiftIds = [1, 2, 3];

const closestEdgeToElement: Ref<Edge | null> = ref(null);

const daySchedule = defineModel<DiaEditavelEmTurnos>({
  default: [],
  required: true,
});

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

      if (!daySchedule.value || !dropTarget) {
        return;
      }

      const startShiftId = args.source.data.turnoId as string;
      const finishShiftId = 
        args.location.current.dropTargets[1]?.data.id as string
      ;

      const startShift = Object.values(daySchedule.value).find(shift =>
        shift.some(cell => cell.turnoId === startShiftId)
      );

      let finishShift;

      if (startShiftId != finishShiftId) {
        finishShift = Object.values(daySchedule.value).find(
          shift =>
            shift.findIndex(cell => cell.turnoId === finishShiftId) !==
            -1
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
        shift => shift.id === args.source.data.id
      );

      const closestEdge = extractClosestEdge(dropTarget.data);

      if (startIndex < 0 || !closestEdge) {
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
        const startKey = Object.keys(daySchedule.value)[
          (Number(startShiftId) as number) - 1
        ];
        const finishKey = Object.keys(daySchedule.value)[
          (Number(finishShiftId) as number) - 1
        ];

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

        const finishShift = daySchedule.value[finishKey];

        if (!finishShift) {
          console.warn('finishShift = ' + finishShift);
          return;
        }

        finishShift.splice(indexOfTarget, 0, draggedItem);
      } else {
        const key = Object.keys(daySchedule.value)[
          (Number(startShiftId) as number) - 1
        ];

        if (!key) {
          console.warn('key = ' + key);
          return;
        }

        daySchedule.value[key] = reorderWithEdge({
          list: startShift,
          startIndex,
          indexOfTarget,
          closestEdgeOfTarget: closestEdge,
          axis: 'vertical',
        });
      }
    },
  });
});

onUnmounted(() => {
  cleanup();
});

defineEmits(['atividade-change']);
</script>

<template>
  <div v-for="(_, key, numberIdx) in daySchedule">
    <SectionHorarioDapeEditShift
      v-if="daySchedule[key]"
      v-model="daySchedule[key]"
      :id="String(shiftIds[numberIdx])"
      :max-capacity="5"
      @atividade-change="$emit('atividade-change')"
    />
  </div>
</template>
