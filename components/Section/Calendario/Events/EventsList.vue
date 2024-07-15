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
  locale?: string;
};

// Props
const props = defineProps({
  year: Number,
  steps: Array<Step>,
  events: Array<Event>,
  monthNum: Number,
  listAllItems: Boolean,
});

// Set event data
let allEventItems = ref<Event[]>([]);

async function setEvents(): Promise<void> {
  try {
    allEventItems.value = [];
    allEventItems.value = await getFormattedEvents.EventList(
      props!.steps,
      props!.events,
      props!.year,
      props!.monthNum
    );

    // Order events by month
    if (props.listAllItems === false) {
      const firstDayOfMonth = dayjs(`${props.year!}-${props.monthNum! + 1}-01`);

      // Filter items
      allEventItems.value = allEventItems.value.filter(
        (event) =>
          (dayjs(event.endDate) >= firstDayOfMonth.startOf('month') ||
            dayjs(event.startDate) >= firstDayOfMonth.startOf('month')) &&
          dayjs(event.startDate) <= firstDayOfMonth.endOf('month')
      );
    }
  } catch (error) {}
}

onMounted(async () => {
  await setEvents();
  await setEvents();

  // Watch month for toggle events
  watch(
    () => props.monthNum!,
    async (newValue: number) => {
      if (newValue !== null) {
        await setEvents();
      }
    }
  );
});
</script>

<template>
  <div
    class="flex flex-col gap-2 w-full -scrollbar overflow-y-auto pr-2 xl:pr-0"
  >
    <SectionCalendarioEventsEvent
      v-for="(event, index) in allEventItems"
      :id="event.id"
      :key="event.id"
      :name="event.name"
      :color="event.color"
      :locale="event.locale"
      :start-date="event.startDate"
      :end-date="event.endDate"
    />
  </div>
</template>

<style scoped></style>
