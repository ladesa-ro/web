<script lang="ts" setup>
import {
  SectionCalendarioFormCrudEventsList,
  UIButtonEventsList,
} from '#components';
import dayjs from 'dayjs';
import { ref } from 'vue';
import { calendarDataMethods } from '../CalendarDataMethods';
import type { CalendarData, CalendarEvent } from '../Types';

// # CODE
type Props = {
  year: number;
  calendarId: string;
  calendarData: CalendarData;
};

const props = defineProps<Props>();

// Variables
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const events = ref<CalendarEvent[]>([]);
const showEventModal = ref(false);

const isViewEventsModalOpen = ref(false);

async function loadEvents() {
  const getSteps = await calendarDataMethods.steps.getSteps(props.calendarId!);
  const getEvents = await calendarDataMethods.events.getEvents(
    props.calendarId!
  );

  events.value = Array.from(
    new Map([...getSteps, ...getEvents].map(e => [e.id, e])).values()
  );

  events.value.sort(
    (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
  );
}

if (props.calendarId) {
  await loadEvents();
}

function abrirModal() {
  showEventModal.value = true;
}

function fecharModal() {
  showEventModal.value = false;
}
</script>

<template>
  <div class="flex flex-wrap w-full h-max gap-6">
    <UIButtonEventsList @open="showEventModal = true" />
    <DialogSkeleton v-model="showEventModal">
      <SectionCalendarioFormCrudEventsList
        v-if="showEventModal"
        :calendar-data="props.calendarData"
        @close="fecharModal"
        @refresh="$emit('refresh')"
      />
    </DialogSkeleton>
    <div class="flex flex-wrap w-full h-max justify-center gap-6">
      <SectionCalendarioMonth
        v-for="month in months"
        :key="month"
        :toggle-month="false"
        :year="props.year"
        :events="events"
        :month-num="month"
        :calendar-id="props.calendarId"
      />
    </div>
  </div>
</template>

<style></style>
