<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';

// Import functions
import { getOrdenedEventList } from '../Functions/GetOrdenedEventList';

// Dayjs config
dayjs.locale('pt-br');
dayjs.extend(isBetween);

// Interface and types
type EventData = {
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
  notifyStatus: boolean;
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
});

// Functions
// Set event list
let allEventItems = ref<Event[]>([]);

// Month num (get emitted value)
let monthNumReceived = ref<number>(0);

const handleUpdate = (v: number) => {
  monthNumReceived.value = v;
};

onMounted(async () => {
  allEventItems.value = await getOrdenedEventList(
    props.steps!,
    props.events!,
    props.year!,
    monthNumReceived.value!,
    'month'
  );
  allEventItems.value = await getOrdenedEventList(
    props.steps!,
    props.events!,
    props.year!,
    monthNumReceived.value!,
    'month'
  );

  // Watch month num
  watch(monthNumReceived, async (newValue: number) => {
    if (newValue !== null) {
      monthNumReceived.value = newValue;
      allEventItems.value = await getOrdenedEventList(
        props.steps!,
        props.events!,
        props.year!,
        monthNumReceived.value!,
        'month'
      );
    }
  });
});
</script>

<template>
  <!-- Content -->
  <div
    class="flex flex-col lg:flex-row justify-between w-[328px] sm:w-[408px] lg:w-[844px] h-auto"
  >
    <!-- Month selected -->
    <div class="flex flex-col w-max h-auto gap-6 mb-6 lg:mr-4 lg:mb-0">
      <SectionCalendarioMonth
        :year="2024"
        :month="dayjs().month()"
        :steps="props.steps!"
        :events="props.events!"
        :toggle-month="true"
        :select-week="false"
        @custom:month-num="handleUpdate"
      />
    </div>

    <!-- Event list -->
    <div
      class="flex flex-col gap-2 w-full -scrollbar overflow-y-auto pr-2 xl:pr-0 max-h-[432px]"
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
        :notify-status="event.notifyStatus"
      />
    </div>
  </div>
</template>

<style scoped></style>
