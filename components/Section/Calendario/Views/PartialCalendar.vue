<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Interface and types
type EventData = {
  id: string;
  type: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
};

type Step = EventData & {
  number: number;
};

type Event = EventData & {
  name: string;
  locale: string;
};

// Props
const props = defineProps({
  year: Number,
  steps: Array<Step>,
  events: Array<Event>,
});

// Functions

// Month num (get emitted value)
let monthNumReceived = ref<number>(0);

const handleUpdate = (v: number) => {
  monthNumReceived.value = v;
};

// Watch month for toggle value
watch(monthNumReceived, (newValue: number) => {
  if (newValue !== null) {
    monthNumReceived.value = newValue;
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
    <SectionCalendarioEventsList
      class="max-w-[420px] xl:max-w-[464px]"
      :year="2024"
      :steps="props.steps!"
      :events="props.events!"
      :month-num="monthNumReceived"
      :view-type="2"
    />
  </div>
</template>

<style scoped></style>
