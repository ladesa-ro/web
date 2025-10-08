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

async function refreshEvents() {
  if (calendar.value?.id) {
    await setMonth(calendar.value);
  }
}

if (calendar.value.id) await setMonth(calendar.value);

watch(calendar, async n => {
  await setMonth(n);
});
</script>

<template>
  <div
    class="flex flex-col md:flex-row w-full h-max justify-center gap-4 md:gap-8"
  >
    <SectionCalendarioMonth
      ref="monthRef"
      :calendar-id="calendar.id"
      :toggle-month="true"
      :year="calendar.year || 0"
      :events="events"
      class="flex-shrink-0 w-full sm:w-[30.6rem] md:w-[20rem] lg:w-[28rem]"
    />

    <div
      class="flex flex-col gap-4 md:gap-6 w-full"
    >
      <SectionCalendarioEvent
        v-for="event in events"
        :key="event.id"
        :event="event"
        :calendarId="calendar.id || ''"
        @refresh="refreshEvents"
        class="p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
      />
    </div>
  </div>
</template>

<style></style>
