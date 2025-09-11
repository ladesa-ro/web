<script setup lang="ts">
import {
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';
import type {
  DayInShifts,
  ShiftName,
  WeekSchedule,
  WeekScheduleHistory,
} from '~/composables/schedule/useScheduleTypes';
import { capitalizeFirst } from '../../-Helpers/CapitalizeFirst';

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
  default: {},
});

const weekScheduleHistory = defineModel<WeekScheduleHistory>('history', {
  required: true,
  default: {},
});

//

const weekdayNames = Object.keys(weekSchedule.value);

//

const closestEdgeToElement: Ref<Edge | null> = ref(null);

let cleanup = () => {};

onMounted(() => {
  cleanup = monitorForElements({
    canMonitor: ({ source }) =>
      source.data.dndType === 'cellDraggable' && props.editMode,

    onDrag: ({ location }) => {
      const dropTarget = location.current.dropTargets[0];
      if (dropTarget) {
        const closestEdge = extractClosestEdge(dropTarget.data);
        closestEdgeToElement.value = closestEdge;
      }
    },

    onDrop: args => {
      const dropTarget = args.location.current.dropTargets[0];

      const startDayScheduleId = args.source.data.dayIndex as number;
      const startDaySchedule: DayInShifts | undefined =
        weekSchedule.value[weekdayNames[startDayScheduleId]!];

      if (!startDaySchedule || !dropTarget) {
        console.warn('startDaySchedule = ' + startDaySchedule);
        return;
      }

      //

      const startShiftId = args.source.data.shiftIndex as number;
      const finishShiftId = args.location.current.dropTargets[1]?.data
        .id as number;

      // : Cell[] | undefined
      const startShift: Cell[] | undefined = Object.values(
        startDaySchedule
      ).find(shift => shift.some(cell => cell.shiftIndex === startShiftId));

      let finishShift: Cell[] | undefined;

      if (startShiftId != finishShiftId) {
        const finishDaySchedule: DayInShifts | undefined =
          weekSchedule.value[weekdayNames[dropTarget.data.dayIndex as number]!];

        if (!finishDaySchedule) {
          console.warn('finishDaySchedule = ' + finishDaySchedule);
          return;
        }

        finishShift = Object.values(finishDaySchedule).find(
          shift =>
            Array.isArray(shift) &&
            shift.some(cell => cell.shiftIndex === finishShiftId)
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
        const draggedItem: Cell | undefined = startShift.splice(
          startIndex,
          1
        )[0];

        if (!draggedItem) {
          console.warn('draggedItem = ' + draggedItem);
          return;
        }

        draggedItem.shiftIndex = finishShiftId;

        finishShift.splice(indexOfTarget, 0, draggedItem);
      }
      //
      else {
        const shiftName: ShiftName | undefined = Object.keys(startDaySchedule)[
          startShiftId
        ] as ShiftName;

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

      weekSchedule.value[weekdayNames[startDayScheduleId]!] = startDaySchedule;

      weekScheduleHistory.value.commit();
    },
  });
});

onUnmounted(() => {
  cleanup();
});

//

const shiftNames: (keyof DayInShifts)[] = ['morning', 'afternoon', 'night'];

const getRowShiftName = (rowShift: string) => {
  switch (rowShift) {
    case 'morning':
      return 'Matutino';
    case 'afternoon':
      return 'Vespertino';
    case 'night':
      return 'Noturno';
  }
};

const dayjs = useDayJs();
</script>

<template>
  <div class="w-max mx-auto">
    <div class="grid grid-cols-6 ml-[6.313rem] mr-0.5 mb-3">
      <SectionHorarioDapeEditDayAndShiftPopover
        v-for="(_, date) of weekSchedule"
        :disabled="!editMode"
      >
        <div
          :class="editMode && 'hover:bg-ldsa-green-1/85'"
          class="bg-ldsa-green-1 rounded-t-lg p-[0.313rem] text-center text-ldsa-white font-medium text-[0.813rem] w-44"
        >
          {{ capitalizeFirst(dayjs(date).format('dddd')) }}
          -
          {{ dayjs(date).format('DD/MM') }}
        </div>
      </SectionHorarioDapeEditDayAndShiftPopover>
    </div>

    <div
      v-for="(rowShift, rowShiftIndex) in shiftNames"
      :key="rowShift"
      class="flex justify-center mb-4 last:mb-0"
    >
      <SectionHorarioDapeEditDayAndShiftPopover
        class="bg-ldsa-green-1 border-r-2 border-ldsa-green-1 brightness-100"
        :class="[
          editMode && 'hover:bg-ldsa-green-1/85 hover:border-transparent',
          rowShiftIndex === 0 && 'rounded-tl-lg',
          rowShiftIndex === 2 && 'rounded-bl-lg',
        ]"
        :disabled="!editMode"
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
            v-for="(cell, cellIndex) in weekSchedule[weekdayNames[0]!]![
              rowShift
            ]"
            :key="cellIndex"
            v-show="
              showBreaks ? true : cell.type === 'aula' || cell.type === 'vago'
            "
            class="border-b-ldsa-text-default/65 text-[0.813rem] font-medium last:border-b-transparent not-last:border-b-[0.119565rem] border-t-solid border-t-transparent last:mb-[1.5px] flex-1 flex items-center justify-center"
            :class="
              cell.type !== 'aula' &&
              cell.type !== 'vago' &&
              'bg-ldsa-grey/20 text-ldsa-text-default/50'
            "
          >
            {{ cell.startHour.format('hh:mm') }}
          </span>
        </div>

        <template v-for="(day, _, dayIndex) of weekSchedule" :key="dayIndex">
          <template
            v-for="(_, shiftName) in Object.fromEntries(
              Object.entries(day).filter(([key]) => key === rowShift)
            )"
            :key="shiftName"
          >
            <SectionHorarioDapeEditShift
              :dayIndex
              :shiftIndex="
                shiftNames.findIndex(turnName => turnName === shiftName)
              "
              :editMode
              v-model="
                weekSchedule[weekdayNames[dayIndex]!]![shiftName as ShiftName]
              "
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
