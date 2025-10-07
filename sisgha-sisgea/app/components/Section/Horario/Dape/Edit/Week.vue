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
  Shift,
  ShiftName,
  WeekSchedule,
} from '~/composables/schedule/useScheduleTypes';
import { capitalizeFirst } from '../../-Helpers/CapitalizeFirst';
import { getRowShiftName, shiftNames } from './-Helpers/getRowShiftName';
import { getAllStartHours, getEmptyShift } from './-Helpers/turnGridPrettier';

const props = defineProps<{
  editMode?: boolean;
  showBreaks?: boolean;
}>();

const showBreaks = computed(() => (props.editMode ? false : props.showBreaks));

provide('showBreaks', showBreaks);

//

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

const weekdayNames = Object.keys(weekSchedule.value);

//

const closestEdgeToElement: Ref<Edge | null> = ref(null);

const emit = defineEmits(['commit-history']);

let cleanup = () => {};

function initMonitor() {
  // limpa monitor antigo, se houver
  try {
    cleanup();
  } catch (e) {}
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
      const startShift: Shift | undefined = Object.values(
        startDaySchedule.daySchedule
      ).find(shift =>
        shift.shiftSchedule.some(cell => cell.shiftIndex === startShiftId)
      );

      let finishShift: Shift | undefined;

      if (startShiftId != finishShiftId) {
        const finishDaySchedule: DayInShifts | undefined =
          weekSchedule.value[weekdayNames[dropTarget.data.dayIndex as number]!];

        if (!finishDaySchedule) {
          console.warn('finishDaySchedule = ' + finishDaySchedule);
          return;
        }

        finishShift = Object.values(finishDaySchedule.daySchedule).find(
          shift =>
            Array.isArray(shift.shiftSchedule) &&
            shift.shiftSchedule.some(cell => cell.shiftIndex === finishShiftId)
        );
      } else {
        finishShift = startShift;
      }

      if (!startShift || !finishShift) {
        console.warn('startShift = ' + JSON.stringify(startShift));
        console.warn('finishShift = ' + JSON.stringify(finishShift));
        return;
      }

      const startIndex = startShift.shiftSchedule.findIndex(
        cell => cell.id === args.source.data.id
      );

      const closestEdge = extractClosestEdge(dropTarget.data);

      if (startIndex === -1 || !closestEdge) {
        console.warn('closestEdge do drop = ' + closestEdge);
        console.warn('startIndex = ' + startIndex);
        return;
      }

      const indexOfTarget = finishShift.shiftSchedule.findIndex(
        cell => cell.id === dropTarget.data.id
      );

      if (indexOfTarget === -1) {
        console.warn('indexOfTarget = ' + indexOfTarget);
        return;
      }

      if (startShiftId != finishShiftId) {
        const draggedItem: Cell | undefined = startShift.shiftSchedule.splice(
          startIndex,
          1
        )[0];

        if (!draggedItem) {
          console.warn('draggedItem = ' + draggedItem);
          return;
        }

        draggedItem.shiftIndex = finishShiftId;

        finishShift.shiftSchedule.splice(indexOfTarget, 0, draggedItem);
      }
      //
      else {
        const shiftName: ShiftName | undefined = Object.keys(
          startDaySchedule.daySchedule
        )[startShiftId] as ShiftName;

        if (!shiftName) {
          console.warn('shiftName = ' + shiftName);
          return;
        }

        startDaySchedule.daySchedule[shiftName].shiftSchedule = reorderWithEdge(
          {
            list: startShift.shiftSchedule,
            startIndex,
            indexOfTarget,
            closestEdgeOfTarget: closestEdge,
            axis: 'vertical',
          }
        );
      }

      weekSchedule.value[weekdayNames[startDayScheduleId]!]!.daySchedule =
        startDaySchedule.daySchedule;

      emit('commit-history');
    },
  });
}

onMounted(() => {
  initMonitor();
});

onUnmounted(() => {
  cleanup();
});

watch(
  () => weekSchedule,
  async () => {
    await nextTick();
    initMonitor();
  }
);

//

const dayjs = useDayJs();

//

const startHours = ref(getAllStartHours(weekSchedule.value));

onMounted(() => {
  startHours.value = getAllStartHours(weekSchedule.value);
});
</script>

<template>
  <div class="w-max mx-auto">
    <div class="grid grid-cols-6 ml-[6.313rem] mr-0.5 mb-3">
      <SectionHorarioDapeEditPopoverDayAndShift
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
      </SectionHorarioDapeEditPopoverDayAndShift>
    </div>

    <div
      v-for="(rowShift, rowShiftIndex) in shiftNames"
      :key="rowShift"
      class="flex justify-center mb-4 last:mb-0"
    >
      <SectionHorarioDapeEditPopoverDayAndShift
        class="bg-ldsa-green-1 border-r-2 border-ldsa-green-1 brightness-100"
        :class="[
          editMode && 'hover:bg-ldsa-green-1/85 hover:border-transparent',
          rowShiftIndex === 0 && 'rounded-tl-lg',
          rowShiftIndex === shiftNames.length - 1 && 'rounded-bl-lg',
        ]"
        :disabled="!editMode"
      >
        <div
          class="text-center vertical-text text-ldsa-white p-1 font-medium text-[0.813rem]"
        >
          {{ getRowShiftName(rowShift) }}
        </div>
      </SectionHorarioDapeEditPopoverDayAndShift>

      <div
        class="grid grid-cols-[auto_repeat(6,1fr)] place-items-center border-2 border-ldsa-green-1 border-l-0 py-2 px-4 gap-4"
        :class="[
          rowShiftIndex === 0 && 'rounded-tr-lg',
          rowShiftIndex === 2 && 'rounded-br-lg',
        ]"
      >
        <div class="flex flex-col w-10 h-full justify-start text-center">
          <template v-for="(hour, hourIndex) in startHours" :key="hourIndex">
            <span
              v-if="
                rowShiftIndex === parseInt(hour[hour.length - 1] ?? '0') &&
                !hour.includes('undefined')
              "
              v-show="showBreaks ? true : !hour.includes('intervalo')"
              class="border-b-ldsa-text-default/65 text-[0.813rem] font-medium last:border-b-transparent not-last:border-b-[0.119565rem] border-t-solid border-t-transparent last:mb-[1.5px] flex-1 flex items-center justify-center"
              :class="
                hour.includes('intervalo') &&
                'bg-ldsa-grey/20 text-ldsa-text-default/50'
              "
            >
              {{ hour.substring(0, 5) }}
            </span>
          </template>
        </div>

        <template v-for="(day, _, dayIndex) of weekSchedule" :key="dayIndex">
          <template
            v-for="(shift, shiftName) in Object.fromEntries(
              Object.entries(day.daySchedule).filter(
                ([key]) => key === rowShift
              )
            )"
            :key="shiftName"
          >
            <SectionHorarioDapeEditShift
              v-if="shift.shiftSchedule.length > 0"
              :dayIndex
              :shiftIndex="
                shiftNames.findIndex(turnName => turnName === shiftName)
              "
              :editMode
              v-model="
                weekSchedule[weekdayNames[dayIndex]!]!.daySchedule[
                  shiftName as ShiftName
                ].shiftSchedule
              "
              @atividade-change="emit('commit-history')"
            />

            <div
              class="flex flex-col w-full"
              :class="editMode && 'opacity-30'"
              v-else
            >
              <SectionHorarioDapeEditGridCellNonEditable
                v-for="(cell, cellIndex) in getEmptyShift(
                  weekSchedule,
                  dayIndex,
                  shiftNames.findIndex(turnName => turnName === shiftName)
                )"
                :key="cellIndex"
                :showBreaks
                :type="cell.type"
              />
            </div>
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
