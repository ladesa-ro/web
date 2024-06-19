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
    class="grid justify-center items-center grid-cols-1 xl:grid-cols-2 gap-6 min-w-[410px] max-w-[952px] w-max xl:w-auto h-auto"
  >
    <!-- Month selected -->
    <div class="flex flex-col w-max h-auto gap-6">
      <PagesDashboardCalendarMonth
        :year="2024"
        :month="dayjs().month()"
        :steps="props.steps!"
        :events="props.events!"
        :toggle-month="true"
        :select-week="false"
        @custom:month-num="handleUpdate"
      />

      <!-- View complete calendar -->
      <UITextButton :text="'Calendário completo'" :show-background="false" />
    </div>

    <!-- Event list -->
    <PagesDashboardCalendarEventList
      :year="2024"
      :steps="props.steps!"
      :events="props.events!"
      :month-num="monthNumReceived"
      :show-all-items="false"
    />
  </div>
</template>

<style scoped></style>
