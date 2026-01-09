<script lang="ts" setup>
import { capitalizeFirst } from '~/components/Section/Horario/-Helpers/CapitalizeFirst';
import {
  getRowShiftName,
  shiftNames,
} from '~/components/Section/Horario/Dape/Edit/-Helpers/getRowShiftName';
import {
  getAllStartHours,
  getEmptyShift,
  type HoursPerShift,
} from '~/components/Section/Horario/Dape/Edit/-Helpers/turnGridPrettier';
import type { WeekSchedule } from '~/composables/schedule/useScheduleTypes';
import { dndMonitor } from './dnd-monitor';

const { commit } = defineProps<{ commit: () => void }>();

const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);

const weekSchedule = defineModel<WeekSchedule>({ default: {}, required: true });

let cleanup = () => {};

onMounted(() => {
  cleanup = dndMonitor(weekSchedule, commit);
});

onUnmounted(() => {
  cleanup();
});

const startHours: Ref<HoursPerShift> = ref(
  getAllStartHours(weekSchedule.value)
);
</script>

<template>
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
        <SectionHorarioDapeEditPopoverDayAndShift
          class="bg-ldsa-green-1 border-r-2 border-ldsa-green-1 brightness-100"
          :class="[
            shiftIndex === 0 && 'rounded-tl-lg',
            shiftIndex === shiftNames.length - 1 && 'rounded-bl-lg',
            editMode && 'hover:bg-ldsa-green-1/85',
          ]"
          :disabled="!editMode"
        >
          <div
            class="vertical-text text-white font-medium text-center py-[0.313rem] text-[0.813rem]"
          >
            {{ getRowShiftName(shift) }}
          </div>
        </SectionHorarioDapeEditPopoverDayAndShift>

        <div
          class="border-2 border-ldsa-green-1 border-l-0 flex flex-1 pl-4 px-5 py-2 gap-4"
          :class="[
            shiftIndex === 0 && 'rounded-tr-lg',
            shiftIndex === shiftNames.length - 1 && 'rounded-br-lg',
          ]"
        >
          <div
            class="flex flex-col w-10 h-full justify-between items-center text-center"
          >
            <div
              v-for="(hour, hourShift) in startHours[shift]"
              :key="hourShift"
              class="border-b-2 border-b-ldsa-text-default/55 last:border-b-0 text-center min-h-6 text-[0.813rem] font-medium px-1 py-0.5"
              :class="
                hour.includes('intervalo')
                  ? 'bg-ldsa-grey/15 text-ldsa-text-default/55'
                  : 'text-ldsa-text-default/95'
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
              shiftIndex === shiftNames.length - 1 && 'rounded-br-lg',
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
                  v-model="
                    weekSchedule[date]!.daySchedule[shift].shiftSchedule[
                      cellIndex
                    ]!
                  "
                />
              </template>

              <!-- TODO: abaixo está uma solução provisória. no futuro, pretendo permitir arrasto de aulas para esses lugares que não estão reservados no horário para terem aula e apresentar um aviso na tela -->
              <div v-else :class="editMode && 'opacity-75'">
                <GridCellNotEditable
                  v-for="(cell, cellIndex) in getEmptyShift(
                    weekSchedule,
                    date,
                    dayIndex,
                    shift
                  )"
                  :key="cellIndex"
                  :type="cell.type"
                />
              </div>
            </div>
          </div>
        </div>
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
