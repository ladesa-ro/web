<script setup lang="ts">
import {
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type DiaEditavelEmTurnos } from '~/composables/schedule/useScheduleTypes';

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
        console.log('=========================');
        return;
      }

      const startShiftId = args.source.data.turnoId as string;
      const finishShiftId = args.location.current.dropTargets[1]?.data
        .id as string;

      const startShift = Object.values(daySchedule.value).find(shift =>
        shift.some((cell, index) => {
          console.log('cell.turnoId:', cell.turnoId, typeof cell.turnoId);
          console.log('cell index:', index);
          return cell.turnoId === startShiftId;
        })
      );
      console.log('=');

      // console.log('args.source.data.id:', args.source.data.id, typeof args.source.data.id);
      console.log('startShiftId:', startShiftId, typeof startShiftId);
      console.log('finishShiftId:', finishShiftId, typeof finishShiftId);
      console.log('startShift:', startShift, typeof startShift);

      let finishShift;

      if (startShiftId != finishShiftId) {
        finishShift = Object.values(daySchedule.value).find(
          shift =>
            shift.findIndex(cell => cell.turnoId === finishShiftId) !== -1
        );
      } else {
        finishShift = startShift;
      }

      if (!startShift || !finishShift) {
        console.warn('startShift = ' + JSON.stringify(startShift));
        console.warn('finishShift = ' + finishShift);
        console.log('=========================');
        return;
      }

      const startIndex = startShift.findIndex(
        shift => shift.id == args.source.data.id
      );

      const closestEdge = extractClosestEdge(dropTarget.data);

      if (startIndex === -1 || !closestEdge) {
        console.warn('closestEdge do drop = ' + closestEdge);
        console.warn('startIndex = ' + startIndex);
        console.log('=========================');
        return;
      }

      const indexOfTarget = finishShift.findIndex(
        horario => horario.id === dropTarget.data.id
      );

      if (indexOfTarget < 0) {
        console.warn('indexOfTarget = ' + indexOfTarget);
        console.log('=========================');

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
          console.log('=========================');

          return;
        }

        const draggedItem = startShift.splice(startIndex, 1)[0];

        if (!draggedItem) {
          console.warn('draggedItem = ' + draggedItem);
          console.log('=========================');
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
          console.log('=========================');
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
  <div v-for="(_, key) in daySchedule">
    <SectionHorarioDapeEditShift
      v-if="daySchedule[key]"
      v-model="daySchedule[key]"
      @atividade-change="$emit('atividade-change')"
    />
  </div>
</template>
