<script lang="ts" setup>
import { getOrdenedEventList } from '../Functions/GetOrdenedEventList';
import type { Event, Step } from '../Typings';

// Dayjs
const dayjs = useDayJs();

// Props
type Props = {
  year?: number;
  steps?: Step[];
  events?: Event[];
};

const props = defineProps<Props>();

// Functions
// Set event list
const allEventItems = ref<Event[]>([]);

// Month num (get emitted value)
const monthNumReceived = ref<number>(0);

const handleUpdate = (v: number) => {
  monthNumReceived.value = v;
};

onMounted(async () => {
  allEventItems.value = await getOrdenedEventList(
    props.steps,
    props.events,
    props.year,
    monthNumReceived.value,
    'month'
  );

  allEventItems.value = await getOrdenedEventList(
    props.steps,
    props.events,
    props.year,
    monthNumReceived.value,
    'month'
  );
});

// Watch month num
watch(monthNumReceived, async (newValue: number) => {
  if (newValue !== null) {
    monthNumReceived.value = newValue;
    allEventItems.value = await getOrdenedEventList(
      props.steps,
      props.events,
      props.year,
      monthNumReceived.value,
      'month'
    );
  }
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
        :events="props.events"
        :month="dayjs().month()"
        :select-week="false"
        :steps="props.steps"
        :toggle-month="true"
        :year="2024"
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
        :color="event.color"
        :end-date="event.endDate"
        :locale="event.locale"
        :name="event.name"
        :notify-status="event.notifyStatus"
        :start-date="event.startDate"
      />
    </div>
  </div>
</template>

<style scoped></style>
