<script lang="ts" setup>
import dayjs from 'dayjs';
import { calendarDataMethods } from '../CalendarDataMethods';
import type { CalendarEvent } from '../Types';

// # IMPORT

// # CODE
type Props = {
  year: number;
  calendarId: string;
};

const props = defineProps<Props>();

// Variables
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let events = ref<CalendarEvent[]>([]);

if (props.calendarId) {
  const getSteps: Array<CalendarEvent> =
    await calendarDataMethods.steps.getSteps(props.calendarId);
  // const getEvents: Array<CalendarEvent> = await calendarDataMethods.events.getEvents(props.calendarId);
  events.value = getSteps;

  // Ordering List
  events.value.sort(
    (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
  );
}
</script>

<template>
  <div class="flex flex-wrap w-full h-max justify-center gap-6">
    <SectionCalendarioMonth
      v-for="month in months"
      :toggle-month="false"
      :year="props.year"
      :events="events"
      :month-num="month"
      :calendar-id="props.calendarId"
    />
  </div>
</template>

<style></style>
