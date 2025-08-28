<script setup lang="ts">
import {
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useRefHistory } from '@vueuse/core';
import {
  type Aula,
  type DiaEditavelEmTurnos,
  type HorDayjs,
  type Vago,
} from '~/composables/schedule/useScheduleTypes';

const shiftIds = [1, 2, 3];

const closestEdgeToElement: Ref<Edge | null> = ref(null);

const daySchedule = defineModel<DiaEditavelEmTurnos>({
  default: [],
  required: true,
});

const horariosHistory = useRefHistory(daySchedule, {
  deep: true,
  capacity: 10,
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

      //

      const startShiftId = Number(args.source.data.turnoId);

      const finishShiftId = Number(
        args.location.current.dropTargets[1]?.data.id
      );

      // se nao tiver finish shift, start shift sera o único shift, isto é, o drag and drop ocorreu entre horário do mesmo período.
      const startShift = Object.values(daySchedule.value).find(shift =>
        shift.some(cell => cell.turnoId === String(startShiftId))
      );

      let finishShift;

      if (startShiftId != finishShiftId) {
        finishShift = Object.values(daySchedule.value).find(
          shift =>
            shift.findIndex(cell => cell.turnoId === String(finishShiftId)) !==
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

      //

      // index inicial do draggable
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

      //

      if (startShiftId != finishShiftId) {
        const startKey = Object.keys(daySchedule.value)[
          (startShiftId as number) - 1
        ];
        const finishKey = Object.keys(daySchedule.value)[
          (finishShiftId as number) - 1
        ];

        if (!startKey || !finishKey) {
          console.warn('startKey = ', startKey);
          console.warn('finishKey = ', finishKey);
          return;
        }

        args.source.data.turnoId = finishShiftId;

        daySchedule.value[startKey]?.splice(startIndex, 1);
        daySchedule.value[1]?.splice(
          indexOfTarget,
          0,
          args.source.data as (Aula | Vago) & HorDayjs
        );

        daySchedule.value[finishKey] = reorderWithEdge({
          list: finishShift,
          startIndex: indexOfTarget,
          indexOfTarget,
          closestEdgeOfTarget: closestEdge,
          axis: 'vertical',
        });

        console.log('mudanca de turno');
      } else {
        const key = Object.keys(daySchedule.value)[
          (startShiftId as number) - 1
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
        console.log('drag no mesmo turno');
      }

      horariosHistory.commit();
    },
  });
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div v-for="(_, key, numberIdx) in daySchedule">
    <SectionHorarioDapeEditShift
      v-if="daySchedule[key]"
      v-model="daySchedule[key]"
      :id="String(shiftIds[numberIdx])"
      @atividade-change="horariosHistory.commit()"
    />
  </div>
</template>
