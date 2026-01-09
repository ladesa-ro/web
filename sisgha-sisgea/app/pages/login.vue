<script lang="ts" setup>
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useManualRefHistory } from '@vueuse/core';
import { capitalizeFirst } from '../components/Section/Horario/-Helpers/CapitalizeFirst';
import {
  getRowShiftName,
  shiftNames,
} from '../components/Section/Horario/Dape/Edit/-Helpers/getRowShiftName';
import {
  getAllStartHours,
  getEmptyShift,
} from '../components/Section/Horario/Dape/Edit/-Helpers/turnGridPrettier';
import type {
  Cell,
  NonEditableCell,
} from '../composables/schedule/edit/useScheduleEditTypes';
import {
  aulasSemDiaSemanaExemplo,
  temposDeAulaExemplo,
} from '../composables/schedule/EXEMPLO';
import type {
  EditableCell,
  HorDayjs,
  ShiftName,
  WeekSchedule,
} from '../composables/schedule/useScheduleTypes';
import { useWeekSchedule } from '../composables/schedule/useWeekSchedule';

definePageMeta({
  layout: 'empty',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

let cleanup = () => {};

const weekSchedule: Ref<WeekSchedule> = ref(
  useWeekSchedule(temposDeAulaExemplo, aulasSemDiaSemanaExemplo)
) as Ref<WeekSchedule>;

const { undo, redo, canRedo, canUndo, commit } = useManualRefHistory(
  weekSchedule,
  { clone: true, capacity: 10 }
);
// flush: 'sync',
onMounted(() => {
  cleanup = monitorForElements({
    onDrop: ({ source, location }) => {
      if (!location.current.dropTargets[0]) {
        return;
      }

      type CellAdaptada = (EditableCell | NonEditableCell) &
        HorDayjs & {
          cellIndex?: number;
          shiftName?: string;
          dayDate?: string;
        };

      const aulaArrastada = source.data as CellAdaptada;
      const aulaAlvo = location.current.dropTargets[0].data as CellAdaptada;

      if (aulaArrastada.id === aulaAlvo.id) {
        console.warn('aula arrastada id = aula alvo id = ', aulaAlvo.id);
        return;
      }

      const arrastadoPeriodo =
        weekSchedule.value[aulaArrastada.dayDate!]!.daySchedule[
          aulaArrastada.shiftName! as ShiftName
        ].shiftSchedule ?? [];

      const alvoPeriodo =
        weekSchedule.value[aulaAlvo.dayDate!]!.daySchedule[
          aulaAlvo.shiftName! as ShiftName
        ].shiftSchedule ?? [];

      if (arrastadoPeriodo.length === 0 || alvoPeriodo.length === 0) {
        console.warn('arrastadoPeriodo = ', arrastadoPeriodo);
        console.warn('alvoPeriodo = ', alvoPeriodo);
        return;
      }

      if (
        aulaArrastada.cellIndex === undefined ||
        aulaAlvo.cellIndex === undefined
      ) {
        console.warn('aulaArrastada.cellIndex', aulaArrastada.cellIndex);
        console.warn('aulaAlvo.cellIndex', aulaAlvo.cellIndex);
        return;
      }

      [aulaArrastada.startHour, aulaAlvo.startHour] = [
        aulaAlvo.startHour,
        aulaArrastada.startHour,
      ];
      [aulaArrastada.endHour, aulaAlvo.endHour] = [
        aulaAlvo.endHour,
        aulaArrastada.endHour,
      ];
      [aulaArrastada.date, aulaAlvo.date] = [aulaAlvo.date, aulaArrastada.date];

      arrastadoPeriodo[aulaArrastada.cellIndex!] = aulaAlvo as Cell;
      alvoPeriodo[aulaAlvo.cellIndex!] = aulaArrastada as Cell;

      commit();
    },
  });
});

onUnmounted(() => {
  cleanup();
});

const startHours: Ref<{
  morning: Set<string>;
  afternoon: Set<string>;
  night: Set<string>;
}> = ref(getAllStartHours(weekSchedule.value));

const showBreaks = ref(true);
const editMode = ref(true);
</script>

<template>
  <div class="flex w-full">
    <button
      class="p-2 bg-red-300 m-2 flex-1 disabled:opacity-50"
      @click="undo"
      :disabled="!canUndo"
    >
      Desfazer
    </button>

    <button
      class="p-2 bg-green-300 m-2 flex-1 disabled:opacity-50"
      @click="redo"
      :disabled="!canRedo"
    >
      Refazer
    </button>
  </div>

  <div class="xl:mx-20">
    <div class="grid grid-cols-6 mb-3 ml-[6.344rem] mr-5 gap-5">
      <SectionHorarioDapeEditPopoverDayAndShift
        v-for="(_, date) of weekSchedule"
        :disabled="!editMode"
      >
        <div
          :class="editMode && 'hover:bg-ldsa-green-1/85'"
          class="bg-ldsa-green-1 rounded-t-lg py-[0.313rem] text-center text-ldsa-white font-medium text-[0.813rem]"
        >
          {{ capitalizeFirst(useDayJs()(date).format('dddd')) }}
          -
          {{ useDayJs()(date).format('DD/MM') }}
        </div>
      </SectionHorarioDapeEditPopoverDayAndShift>
    </div>

    <div class="flex flex-col gap-5">
      <div
        v-for="(shift, shiftIndex) in shiftNames"
        :key="shiftIndex"
        class="flex"
      >
        <div
          class="bg-ldsa-green-1 vertical-text text-white font-medium text-center py-[0.313rem] text-[0.813rem]"
          :class="[
            shiftIndex === 0 && 'rounded-br-lg',
            shiftIndex === 2 && 'rounded-tr-lg',
          ]"
        >
          {{ getRowShiftName(shift) }}
        </div>

        <div
          class="border-2 border-ldsa-green-1 flex flex-1 pl-4 px-5 py-2 gap-4"
        >
          <div
            class="flex flex-col w-10 h-full justify-between items-center text-center"
          >
            <div
              v-for="(hour, hourShift) in startHours[shift]"
              :key="hourShift"
              class="border-b-2 border-b-ldsa-text-default/55 text-ldsa-text-default/95 last:border-b-0 text-center min-h-6 text-[0.813rem] font-medium px-1"
              :class="
                hour.includes('intervalo') &&
                'bg-ldsa-grey/15 text-ldsa-black/60'
              "
              v-show="showBreaks ? true : !hour.includes('intervalo')"
            >
              {{ hour.replace(' intervalo', '') }}
            </div>
          </div>

          <div
            class="grid grid-cols-6 gap-5 border-ldsa-green-1 flex-1"
            :class="[
              shiftIndex === 0 && 'rounded-tr-lg',
              shiftIndex === 2 && 'rounded-br-lg',
            ]"
          >
            <div v-for="(day, date, dayIndex) of weekSchedule" :key="date">
              <template
                v-if="
                  weekSchedule[date]!.daySchedule[shift]!.shiftSchedule.length >
                  0
                "
              >
                <GridCell
                  v-for="(_, cellIndex) in day.daySchedule[shift].shiftSchedule"
                  :key="cellIndex"
                  :cellIndex="cellIndex"
                  :shiftName="shift"
                  :shiftIndex="shiftIndex"
                  :dayDate="date"
                  :editMode="editMode"
                  v-model="
                    weekSchedule[date]!.daySchedule[shift].shiftSchedule[
                      cellIndex
                    ]!
                  "
                  :editable="true"
                />
              </template>

              <div v-else :class="editMode && 'opacity-50'">
                <GridCellNotEditable
                  v-for="(cell, cellIndex) in getEmptyShift(
                    weekSchedule,
                    date,
                    dayIndex,
                    shift
                  )"
                  :key="cellIndex"
                  :showBreaks="showBreaks"
                  :type="cell.type"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <br />
  <br />
  <br />

  <!-- <pre><code>
    {{ weekSchedule }}
  </code></pre> -->
</template>

<style scoped>
.vertical-text {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}
</style>
