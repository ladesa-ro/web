<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import dayjs, { type Dayjs } from 'dayjs';
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from 'reka-ui';
import { computed } from 'vue';
import IconArrowArrow from '../icons/Arrow/Arrow.vue';
import Popover from './Popover.vue';

const open = defineModel<boolean>({ required: true, default: false });

const props = defineProps<{
  selectedDay?: Dayjs;
}>();

const emit = defineEmits<{
  select: [day: Dayjs];
}>();

const calendarValue = computed({
  get: () => {
    const d = props.selectedDay ?? dayjs();
    return new CalendarDate(d.year(), d.month() + 1, d.date());
  },
  set: val => {
    if (val) {
      const selected = dayjs(new Date(val.year, val.month - 1, val.day));
      emit('select', selected);
      open.value = false;
    }
  },
});
</script>

<template>
  <Popover v-model="open" arrow>
    <template #activator>
      <slot />
    </template>

    <div class="ui-popover-calendar">
      <CalendarRoot
        v-slot="{ weekDays, grid }"
        v-model="calendarValue"
        locale="pt-BR"
        weekday-format="short"
      >
        <CalendarHeader class="ui-popover-calendar__header">
          <CalendarPrev class="ui-popover-calendar__nav">
            <IconArrowArrow class="ui-popover-calendar__nav-icon" />
          </CalendarPrev>

          <CalendarHeading class="ui-popover-calendar__heading" />

          <CalendarNext class="ui-popover-calendar__nav">
            <IconArrowArrow
              class="ui-popover-calendar__nav-icon"
              style="transform: rotate(180deg)"
            />
          </CalendarNext>
        </CalendarHeader>

        <CalendarGrid
          v-for="month in grid"
          :key="month.value.toString()"
          class="ui-popover-calendar__grid"
        >
          <CalendarGridHead>
            <CalendarGridRow style="display: flex">
              <CalendarHeadCell
                v-for="day in weekDays"
                :key="day"
                class="ui-popover-calendar__weekday"
              >
                {{ day }}
              </CalendarHeadCell>
            </CalendarGridRow>
          </CalendarGridHead>

          <CalendarGridBody>
            <CalendarGridRow
              v-for="(weekDates, weekIndex) in month.rows"
              :key="`week-${weekIndex}`"
              style="display: flex; gap: 0.25rem"
            >
              <CalendarCell
                v-for="weekDate in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                class="ui-popover-calendar__cell"
              >
                <CalendarCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  class="ui-popover-calendar__day"
                />
              </CalendarCell>
            </CalendarGridRow>
          </CalendarGridBody>
        </CalendarGrid>
      </CalendarRoot>
    </div>
  </Popover>
</template>
