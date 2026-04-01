<script lang="ts" setup>
import type { CalendarData } from '../Types';
import { useCalendarEvents } from '../useCalendarEvent';

type Props = { calendarData: CalendarData };

const props = defineProps<Props>();

const calendarId = computed(() => props.calendarData.id);

const { events, reload } = useCalendarEvents(calendarId);
</script>

<template>
  <div class="flex max-lg:flex-col w-full h-max justify-center gap-4">
    <SectionCalendarioMonth
      :calendar-id="props.calendarData.id"
      :toggle-month="true"
      :year="props.calendarData.year || 0"
      :events="events"
      class="shrink-0 w-full sm:w-[30.6rem] md:w-[20rem] lg:w-[28rem]"
    />

    <div class="grid grid-cols-1 gap-4 w-full">
      <SectionCalendarioEvent
        v-for="event in events"
        :key="event.id"
        :event="event"
        :calendar-id="props.calendarData.id"
        @refresh="reload"
      />
    </div>
  </div>
</template>
