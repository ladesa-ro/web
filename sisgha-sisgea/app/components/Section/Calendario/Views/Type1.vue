<script lang="ts" setup>
import dayjs from 'dayjs';
import { calendarDataMethods } from '../CalendarDataMethods';
import type { CalendarData, CalendarEvent } from '../Types';

// # IMPORT

// # CODE
type Props = {
  calendarData: CalendarData;
};

const props = defineProps<Props>();

// Variables
// TODO: Make a event filter by month
// let selectedMonth = ref<string>(dayjs(dayjs).format("YYYY-MM-DD"));
let calendar = toRef(props, 'calendarData');
let events = ref<CalendarEvent[]>([]);

async function setMonth(c: CalendarData) {
  const getSteps: Array<CalendarEvent> =
    await calendarDataMethods.steps.getSteps(c.id!);
  const getEvents: Array<CalendarEvent> =
    await calendarDataMethods.events.getEvents(c.id!);

  events.value = getSteps.concat(getEvents);
  // events.value = events.value.filter(item => dayjs(item.startDate).month() === month);

  // Ordering List
  events.value.sort(
    (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
  );
}

if (calendar.value.id) await setMonth(calendar.value);

watch(calendar, async n => {
  await setMonth(n);
});
</script>

<template>
  <div class="flex flex-col md:flex-row w-full h-max justify-center gap-6">
    <SectionCalendarioMonth
      ref="monthRef"
      :calendar-id="calendar.id"
      :toggle-month="true"
      :year="calendar.year!"
      :events="events"
    />

    <div class="flex flex-col gap-6 w-full overflow-hidden max-w-[600px]">
      <SectionCalendarioEvent
        v-for="event in events"
        :event="event"
        :calendarId="calendar.id"
      />
    </div>
  </div>
</template>

<style></style>
