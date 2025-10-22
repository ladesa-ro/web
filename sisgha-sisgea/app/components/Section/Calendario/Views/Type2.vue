<script lang="ts" setup>
import {
  IconsCalendarItems,
  SectionCalendarioFormEvents,
  UIToggle,
} from '#components';
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

let toggleView = ref<number>(0);
const toggleItems = [{ text: 'Eventos', value: 0, icon: IconsCalendarItems }];

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

// chamada inicial
if (props.calendarId) {
  await loadEvents();
}
</script>

<template>
  <div class="flex flex-wrap w-full h-max gap-6">
    <!-- <DialogModalEditOrCreateModal
      :form-component="SectionCalendarioFormEvents"
      :form-props="{ events: events }"
      @refresh="loadEvents"
    />  modal de editar eventos (não mostra aqui)-->
 
    <!-- modal de ver eventos (não existe ainda) -->
    <UIToggle :items="toggleItems" v-model="toggleView" class="w-full" />

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
  </div>
</template>

<style></style>
