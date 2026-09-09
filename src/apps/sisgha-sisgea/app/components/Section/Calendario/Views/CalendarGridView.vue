<script lang="ts" setup>
import type { CalendarData } from '../Types';
import { useCalendarEvents } from '../useCalendarEvent';

type Props = { calendarData: CalendarData };

const props = defineProps<Props>();

const calendarId = computed(() => props.calendarData.id);

const { events, reload } = useCalendarEvents(calendarId);
</script>

<template>
  <div class="calendar-grid-view u-flex u-w-full u-justify-center u-gap-4">
    <SectionCalendarioMonth
      :calendar-id="props.calendarData.id"
      :toggle-month="true"
      :year="props.calendarData.year || 0"
      :events="events"
      class="calendar-grid-view__month u-shrink-0 u-w-full"
    />

    <div class="calendar-grid-view__events u-grid u-gap-4 u-w-full">
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

<style scoped>
.calendar-grid-view {
  height: max-content;
  flex-direction: row;
}

@media (max-width: 1023.98px) {
  .calendar-grid-view {
    flex-direction: column;
  }
}

@media (min-width: 640px) {
  .calendar-grid-view__month {
    width: 30.6rem;
  }
}

@media (min-width: 768px) {
  .calendar-grid-view__month {
    width: 20rem;
  }
}

@media (min-width: 1024px) {
  .calendar-grid-view__month {
    width: 28rem;
  }
}

.calendar-grid-view__events {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
</style>
