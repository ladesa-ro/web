<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';

// Import functions
import { getFormattedEvents } from './Functions/GetFormattedEvents';

// Dayjs config
dayjs.locale('pt-br');
dayjs.extend(isBetween);

// Interface and types
type EventData = {
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
};

type Step = EventData & {
  number: number;
};

type Event = EventData & {
  name: string;
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs;
  locale?: string;
};

// Props
const props = defineProps({
  year: Number,
  steps: Array<Step>,
  events: Array<Event>,
  monthNum: Number,
  listingType: Number,
});

// Set event data
let allEventItems = ref<Event[]>([]);

onMounted(async () => {
  allEventItems.value = await getFormattedEvents.EventList(
    props!.steps,
    props!.events,
    props!.listingType,
    props!.year,
    props!.monthNum
  );

  console.log(allEventItems.value);

  // Watch month for toggle events
  watch(
    () => props.monthNum!,
    async (newValue: number) => {
      if (newValue !== null) {
        allEventItems.value = [];
        allEventItems.value = await getFormattedEvents.EventList(
          props!.steps,
          props!.events,
          props!.listingType,
          props!.year,
          props!.monthNum
        );
      }
    }
  );
});
</script>

<template>
  <div
    class="flex flex-col gap-2 w-full"
    :class="{
      '-scrollbar overflow-y-auto pr-2 xl:pr-0': props.listingType! > 0,
      'h-[504px]': props.listingType! === 2,
    }"
  >
    <SectionCalendarioEventsEvent
      v-for="(event, index) in allEventItems"
      :id="event.id"
      :key="event.id"
      :name="event.name"
      :locale="event.locale"
      :color="event.color"
    />
  </div>
</template>

<style scoped></style>
