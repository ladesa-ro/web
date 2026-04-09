<script setup lang="ts">
import {
  CalendarRoot,
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
} from 'reka-ui';
import { CalendarDate } from '@internationalized/date';
import type { Dayjs } from 'dayjs';

const open = defineModel<boolean>({ required: true, default: false });

const props = defineProps<{
  selectedDay?: Dayjs;
}>();

const emit = defineEmits<{
  select: [day: Dayjs];
}>();

const dayjs = useDayJs();

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
  <UIPopover v-model="open" arrow>
    <template #activator>
      <slot />
    </template>

    <div class="popover-calendar">
      <CalendarRoot
        v-slot="{ weekDays, grid }"
        v-model="calendarValue"
        locale="pt-BR"
        weekday-format="short"
      >
        <!-- Header com nome do mês -->
        <CalendarHeader class="calendar-header">
          <CalendarPrev class="calendar-nav">
            <IconsArrow class="w-3.5 h-3.5" />
          </CalendarPrev>

          <CalendarHeading class="calendar-heading" />

          <CalendarNext class="calendar-nav">
            <IconsArrow class="rotate-180 w-3.5 h-3.5" />
          </CalendarNext>
        </CalendarHeader>

        <!-- Grid do mês -->
        <CalendarGrid
          v-for="month in grid"
          :key="month.value.toString()"
          class="calendar-grid"
        >
          <CalendarGridHead>
            <CalendarGridRow class="flex">
              <CalendarHeadCell
                v-for="day in weekDays"
                :key="day"
                class="calendar-weekday"
              >
                {{ day }}
              </CalendarHeadCell>
            </CalendarGridRow>
          </CalendarGridHead>

          <CalendarGridBody>
            <CalendarGridRow
              v-for="(weekDates, weekIndex) in month.rows"
              :key="`week-${weekIndex}`"
              class="flex gap-1"
            >
              <CalendarCell
                v-for="weekDate in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                class="calendar-cell"
              >
                <CalendarCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  class="calendar-day"
                />
              </CalendarCell>
            </CalendarGridRow>
          </CalendarGridBody>
        </CalendarGrid>
      </CalendarRoot>
    </div>
  </UIPopover>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.popover-calendar {
  @apply border-2 border-ldsa-grey rounded-lg overflow-hidden bg-ldsa-bg;
  width: 280px;
}

.calendar-header {
  @apply flex items-center justify-between bg-ldsa-grey/60 px-3 py-2;
}

.calendar-heading {
  @apply text-ldsa-white uppercase text-center font-bold text-sm;
}

.calendar-nav {
  @apply text-ldsa-white p-1 rounded hover:bg-white/20 cursor-pointer;
}

.calendar-grid {
  @apply p-3;
}

.calendar-weekday {
  @apply w-9 h-7 text-xs font-semibold text-ldsa-text-default flex items-center justify-center;
}

.calendar-cell {
  @apply flex items-center justify-center;
}

.calendar-day {
  @apply w-8 h-8 aspect-square rounded-lg text-sm font-bold flex items-center justify-center cursor-pointer;
  @apply text-ldsa-white bg-ldsa-grey/60;
  @apply hover:bg-ldsa-green-2/80;
  transition: background-color 0.15s;
}

.calendar-day[data-selected] {
  @apply bg-ldsa-green-1 text-ldsa-white;
}

.calendar-day[data-today] {
  @apply border-2 border-ldsa-white;
}

.calendar-day[data-outside-month] {
  @apply bg-ldsa-grey/30 text-ldsa-white/40;
}

.calendar-day[data-disabled] {
  @apply cursor-default opacity-30;
}
</style>
