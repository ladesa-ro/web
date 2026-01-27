<script lang="ts" setup>
import {
  SectionCalendarioFormCrudEventsList,
  UIButtonEventsList,
} from '#components';
import { computed, ref, toRef } from 'vue';
import type { CalendarData } from '../Types';
import { useCalendarEvents } from '../useCalendarEvent';

// # PROPS
type Props = {
  year: number;
  calendarId: string;
  calendarData: CalendarData;
};

const props = defineProps<Props>();

// # STATES
const showEventModal = ref(false);
const isViewEventsModalOpen = ref(false);

// # MONTH PAIRS (mantido igual)
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthPairs = computed(() => {
  const pairs: number[][] = [];
  for (let i = 0; i < months.length; i += 2) {
    pairs.push(months.slice(i, i + 2));
  }
  return pairs;
});

// # EVENTS — usando o hook reativo
const { events, reload } = useCalendarEvents(toRef(props, 'calendarId'));

// # MODALS
function abrirModal() {
  showEventModal.value = true;
}
function fecharModal() {
  showEventModal.value = false;
}
</script>

<template>
  <div class="flex flex-wrap w-full h-max gap-6">
    <UIButtonEventsList @open="abrirModal" />

    <DialogSkeleton v-model="showEventModal">
      <SectionCalendarioFormCrudEventsList
        v-if="showEventModal"
        :calendar-data="props.calendarData"
        @close="fecharModal"
        @refresh="reload" 
      />
    </DialogSkeleton>

    <div class="flex flex-col w-full gap-6">
      <div
        v-for="(monthPair, index) in monthPairs"
        :key="index"
        class="flex w-full gap-6 justify-center"
      >
        <SectionCalendarioMonth
          v-for="month in monthPair"
          :key="month"
          :toggle-month="false"
          :year="props.year"
          :events="events"
          :month-num="month"
          :calendar-id="props.calendarId"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
