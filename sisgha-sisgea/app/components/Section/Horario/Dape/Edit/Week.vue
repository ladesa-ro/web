<script setup lang="ts">
import {
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';
import type {
  Aula,
  DiaEditavelEmTurnos,
  HorDayjs,
  Vago,
  WeekdayMeta,
  WeekSchedule,
  WeekScheduleHistory,
} from '~/composables/schedule/useScheduleTypes';

const props = defineProps<{
  editMode?: boolean;
  showBreaks?: boolean;
}>();

const showBreaks = computed(() => (props.editMode ? false : props.showBreaks));

provide('showBreaks', showBreaks);

watch(
  () => props.editMode,
  newVal => {
    if (!newVal) useSelectedCells({ action: 'removeAll' });
  }
);

//

const weekSchedule = defineModel<WeekSchedule>({
  required: true,
  default: new Map(),
});

const weekScheduleHistory = defineModel<WeekScheduleHistory>('history', {
  required: true,
  default: {},
});

//

type WeekScheduleEditable = {
  data: WeekdayMeta;
  schedule: DiaEditavelEmTurnos;
}[];

const weekScheduleEditable: Ref<WeekScheduleEditable> = ref(
  [...weekSchedule.value.entries()].map(([dayMeta, daySchedule]) => ({
    data: { ...dayMeta, data: useDayJs()(dayMeta.data).format('DD/MM') },
    schedule: daySchedule,
  }))
);

// Maps arrent reactive in vue, so is necessary to watch for changes in the editable array and update the original Map
watch(
  weekScheduleEditable,
  newVal => {
    weekSchedule.value.forEach((_, dayMeta) => {
      const changedDay = newVal.find(val => val.data.data === dayMeta.data);

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
      source.data.type === 'cellDraggable' && props.editMode,

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
        shift => shift.id === args.source.data.id
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
        return;
      }

      if (startShiftId != finishShiftId) {
        const draggedItem: (Aula & HorDayjs) | (Vago & HorDayjs) | undefined =
          startShift.splice(startIndex, 1)[0];

        if (!draggedItem) {
          console.warn('draggedItem = ' + draggedItem);
          return;
        }

        draggedItem.turnoId = finishShiftId;

        finishShift.splice(indexOfTarget, 0, draggedItem);
      }
      //
      else {
        const shiftName = Object.keys(startDaySchedule)[startShiftId];

        if (!shiftName) {
          console.warn('shiftName = ' + shiftName);
          return;
        }

        startDaySchedule[shiftName] = reorderWithEdge({
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

//

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
  <div class="w-max mx-auto">
    <div class="grid grid-cols-6 ml-[6.313rem] mr-0.5 mb-3">
      <SectionHorarioDapeEditDayAndShiftPopover
        v-for="day in weekScheduleEditable"
        :disabled="!editMode"
      >
        <div
          :class="editMode && 'hover:bg-ldsa-green-1/85'"
          class="bg-ldsa-green-1 rounded-t-lg p-[0.313rem] text-center text-ldsa-white font-medium text-[0.813rem] w-44"
        >
          {{ day.data.weekday }} - {{ day.data.data }}
        </div>
      </SectionHorarioDapeEditDayAndShiftPopover>
    </div>

    <div
      v-for="(rowShift, rowShiftIndex) in ['manha', 'tarde', 'noite']"
      class="flex justify-center mb-4 last:mb-0"
    >
      <SectionHorarioDapeEditDayAndShiftPopover
        :disabled="!editMode"
        class="bg-ldsa-green-1 border-b-2 border-ldsa-green-1 brightness-100"
        :class="[
          editMode && 'hover:bg-ldsa-green-1/85 hover:border-ldsa-green-2',
          rowShiftIndex === 0 && 'rounded-tl-lg',
          rowShiftIndex === 2 && 'rounded-bl-lg',
        ]"
      >
        <div
          class="text-center vertical-text text-ldsa-white p-1 font-medium text-[0.813rem]"
        >
          {{ getRowShiftName(rowShift) }}
        </div>
      </SectionHorarioDapeEditDayAndShiftPopover>

      <div
        class="grid grid-cols-[auto_repeat(6,1fr)] place-items-center border-2 border-ldsa-green-1 border-l-0 py-2 px-4 gap-4"
        :class="[
          rowShiftIndex === 0 && 'rounded-tr-lg',
          rowShiftIndex === 2 && 'rounded-br-lg',
        ]"
      >
        <div class="flex flex-col w-10 h-full justify-start text-center">
          <!-- TODO: pegar os horários do array de tempos de aula -->
          <span
            v-for="(cell, cellIndex) in weekScheduleEditable[0]?.schedule[
              rowShift
            ]"
            :key="cellIndex"
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
  </div>
</template>

<style scoped>
.vertical-text {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}
</style>
