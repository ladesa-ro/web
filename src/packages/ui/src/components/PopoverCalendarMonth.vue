<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
} from 'reka-ui';

export type PopoverCalendarMonthProps = {
  month: { value: DateValue; rows: DateValue[][] };
  weekDays: string[];
};

defineProps<PopoverCalendarMonthProps>();
</script>

<template>
  <CalendarGrid class="ui-popover-calendar__grid">
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
</template>
