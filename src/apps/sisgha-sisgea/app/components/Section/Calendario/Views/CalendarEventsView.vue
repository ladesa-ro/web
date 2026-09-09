<script lang="ts" setup>
import {
  SectionCalendarioFormCrudEventsList,
  UIButtonEventsList,
} from '#components';
import { computed, ref, toRef } from 'vue';
import type { CalendarData } from '../Types';
import { useCalendarEvents } from '../useCalendarEvent';

type Props = {
  year: number;
  calendarId: string;
  calendarData: CalendarData;
};

const props = defineProps<Props>();

const showEventModal = ref(false);

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthPairs = computed(() => {
  const pairs: number[][] = [];
  for (let i = 0; i < months.length; i += 2) {
    pairs.push(months.slice(i, i + 2));
  }
  return pairs;
});

const { events, reload } = useCalendarEvents(toRef(props, 'calendarId'));

function abrirModal() {
  showEventModal.value = true;
}
function fecharModal() {
  showEventModal.value = false;
}
</script>

<template>
  <div class="calendar-events-view u-flex u-flex-wrap u-w-full u-gap-6">
    <UIButtonEventsList @open="abrirModal" />

    <DialogSkeleton v-model="showEventModal">
      <SectionCalendarioFormCrudEventsList
        v-if="showEventModal"
        :calendar-data="props.calendarData"
        @close="fecharModal"
        @refresh="reload"
      />
    </DialogSkeleton>

    <div class="u-flex u-flex-col u-w-full u-gap-6">
      <div
        v-for="(monthPair, index) in monthPairs"
        :key="index"
        class="u-flex u-w-full u-gap-6 u-justify-center"
      >
        <SectionCalendarioMonth
          v-for="month in monthPair"
          :key="month"
          :toggle-month="false"
          :year="props.year"
          :events="events"
          :month-num="month"
          :calendar-id="props.calendarId"
          class="u-flex-1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-events-view {
  height: max-content;
}
</style>
