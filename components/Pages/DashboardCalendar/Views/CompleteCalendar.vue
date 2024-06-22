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
const monthNums = ref<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

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
    class="flex flex-col justify-between w-[328px] sm:w-[408px] lg:w-full h-auto"
  >
    <!-- Months -->
    <div
      class="grid grid-cols-1 lg:grid-cols-2 w-max h-auto gap-4 max-w-[944px] mb-6"
    >
      <PagesDashboardCalendarMonth
        v-for="month in monthNums"
        :year="2024"
        :month="month"
        :steps="props.steps!"
        :events="props.events!"
        :toggle-month="false"
        :select-week="false"
        @custom:month-num="handleUpdate"
      />
    </div>

    <!-- Event list -->
    <PagesDashboardCalendarEventList
      class="w-[420px] xl:w-full mb-4 h-[468px]"
      :year="2024"
      :steps="props.steps!"
      :events="props.events!"
      :month-num="0"
      :view-type="1"
    />
  </div>
</template>

<style scoped></style>
