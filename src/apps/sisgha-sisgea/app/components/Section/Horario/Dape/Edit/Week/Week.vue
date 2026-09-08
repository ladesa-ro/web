<script lang="ts" setup>
import { capitalizeFirst } from '@ladesa-ro/web.utils';
import {
  getRowShiftName,
  shiftNames,
} from '~/components/Section/Horario/Dape/Edit/-Helpers/getRowShiftName';
import {
  getAllStartHours,
  type HoursPerShift,
} from '~/components/Section/Horario/Dape/Edit/-Helpers/turnGridPrettier';
import type { WeekSchedule } from '~/utils/schedule/types';
import GridCell from '../GridCell/GridCell.vue';
import { useDayJs } from '#imports';

const { commit } = defineProps<{ commit: () => void }>();

const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);

const weekSchedule = defineModel<WeekSchedule>({ default: {}, required: true });

useDragAndDropSchedule(weekSchedule, commit);

const startHours: Ref<HoursPerShift> = ref(
  getAllStartHours(weekSchedule.value)
);
</script>

<template>
  <div class="week">
    <div class="week__header-grid u-grid u-mb-3 u-mr-5 u-gap-5">
      <SectionHorarioDapeEditPopoverDayAndShift
        v-for="(_, date) of weekSchedule"
        :key="date"
        :disabled="!editMode"
      >
        <div
          class="week__day-header u-flex u-justify-center u-text-center u-font-medium"
          :class="[editMode && 'week__day-header--hoverable']"
        >
          <span>
            {{ capitalizeFirst(useDayJs()(date).format('dddd')) }}
          </span>

          <span class="week__day-header-separator">&nbsp;-&nbsp;</span>

          <span>
            {{ useDayJs()(date).format('DD/MM') }}
          </span>
        </div>
      </SectionHorarioDapeEditPopoverDayAndShift>
    </div>

    <div class="u-flex u-flex-col u-gap-5">
      <div
        v-for="(shift, shiftIndex) in shiftNames"
        :key="shift"
        class="u-flex"
      >
        <SectionHorarioDapeEditPopoverDayAndShift
          class="week__shift-label"
          :class="[
            shiftIndex === 0 && 'week__rounded-tl',
            shiftIndex === shiftNames.length - 1 && 'week__rounded-bl',
            editMode && 'week__shift-label--hoverable',
          ]"
          :disabled="!editMode"
        >
          <div class="vertical-text u-font-medium u-text-center">
            {{ getRowShiftName(shift) }}
          </div>
        </SectionHorarioDapeEditPopoverDayAndShift>

        <div
          class="week__shift-body u-flex u-flex-1 u-pl-4 u-pr-5 u-py-2 u-gap-4"
          :class="[
            shiftIndex === 0 && 'week__rounded-tr',
            shiftIndex === shiftNames.length - 1 && 'week__rounded-br',
          ]"
        >
          <div
            class="week__hours-column u-flex u-flex-col u-h-full u-justify-between u-items-center u-text-center"
          >
            <div
              v-for="(hour, hourShift) in startHours[shift]"
              v-show="showBreaks ? true : !hour.includes('intervalo')"
              :key="hourShift"
              class="week__hour-cell u-text-center u-font-medium u-px-1 u-py-0-5 u-h-full u-flex u-items-center u-justify-center"
              :class="
                hour.includes('intervalo')
                  ? 'week__hour-cell--intervalo'
                  : 'week__hour-cell--normal'
              "
            >
              {{ hour.replace(' intervalo', '') }}
            </div>
          </div>

          <div
            class="week__cells-grid u-grid u-gap-5 u-flex-1"
            :class="[
              shiftIndex === 0 && 'week__rounded-tr',
              shiftIndex === shiftNames.length - 1 && 'week__rounded-br',
            ]"
          >
            <div v-for="(day, date) of weekSchedule" :key="date">
              <GridCell
                v-for="(cell, cellIndex) in day.daySchedule[shift]
                  .shiftSchedule"
                :key="cell.id"
                v-model="
                  weekSchedule[date]!.daySchedule[shift].shiftSchedule[
                    cellIndex
                  ]!
                "
                :cell-index="cellIndex"
                :shift-name="shift"
                :shift-index="shiftIndex"
                :day-date="date"
                @edit-cell="commit()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.week {
  min-width: 50rem;
}

.week__header-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  margin-left: 6.344rem;
}

.week__day-header {
  background-color: var(--ladesa-green-1-color);
  border-top-left-radius: var(--ui-radius-lg);
  border-top-right-radius: var(--ui-radius-lg);
  padding-block: 0.313rem;
  color: var(--ladesa-white-color);
  font-size: 0.813rem;
}

@media (max-width: 1023.98px) {
  .week__day-header {
    flex-direction: column;
  }
}

.week__day-header--hoverable:hover {
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 85%);
}

@media (max-width: 1023.98px) {
  .week__day-header-separator {
    display: none;
  }
}

.week__shift-label {
  background-color: var(--ladesa-green-1-color);
  border-right: 2px solid var(--ladesa-green-1-color);
  filter: brightness(1);
}

.week__shift-label--hoverable:hover {
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 85%);
}

.vertical-text {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  color: var(--ladesa-white-color);
  padding-block: 0.313rem;
  font-size: 0.813rem;
}

.week__shift-body {
  border: 2px solid var(--ladesa-green-1-color);
  border-left: 0;
}

.week__hours-column {
  width: 2.5rem;
}

.week__hour-cell {
  border-bottom: 2px solid
    rgb(from var(--ladesa-text-default-color) R G B / 55%);
  min-height: 1.5rem;
  font-size: 0.813rem;
}

.week__hour-cell:last-child {
  border-bottom: 0;
}

@media (max-width: 1023.98px) {
  .week__hour-cell {
    height: 3rem;
  }
}

.week__hour-cell--intervalo {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
  color: rgb(from var(--ladesa-text-default-color) R G B / 55%);
}

.week__hour-cell--normal {
  color: rgb(from var(--ladesa-text-default-color) R G B / 95%);
}

.week__cells-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  border-color: var(--ladesa-green-1-color);
}

.week__rounded-tl {
  border-top-left-radius: var(--ui-radius-lg);
}

.week__rounded-bl {
  border-bottom-left-radius: var(--ui-radius-lg);
}

.week__rounded-tr {
  border-top-right-radius: var(--ui-radius-lg);
}

.week__rounded-br {
  border-bottom-right-radius: var(--ui-radius-lg);
}
</style>
