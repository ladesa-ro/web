<script lang="ts" setup>
import { getOrdenedEventList } from '../Functions/GetOrdenedEventList';
import type { Event, Step } from '../Typings';

const dayjs = useDayJs();

//

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
  <div class="flex flex-col lg:flex-row justify-between gap-4">
    <!-- Month selected -->
    <div class="flex flex-col w-max h-auto gap-6">
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
      class="flex flex-col gap-2 w-full overflow-y-auto max-h-[27rem] 2xl:max-h-[531.25rem]"
    >
      <SectionCalendarioEventsEvent
        v-for="event in allEventItems"
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