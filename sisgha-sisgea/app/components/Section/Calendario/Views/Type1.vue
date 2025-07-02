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
  <div class="flex flex-col md:flex-row w-full h-max justify-center gap-6">
    <SectionCalendarioMonth :calendar-id="props.calendarId" :toggle-month="true" :year="props.year" :events="events" />

    <div class="flex flex-col gap-6 w-full overflow-hidden max-w-[600px]">
      <SectionCalendarioEvent
        v-for="event in events"
        :name="event.name"
        :start-date="event.startDate"
        :end-date="event.endDate"
        :color="event.color"
      />
    </div>
  </div>
</template>

<style></style>
