<script lang="ts" setup>
import 'dayjs/locale/pt-br';
import type { Event, Step } from '../Typings';

// Props
type Props = {
  year?: number;
  steps?: Step[];
  events?: Event[];
};

const props = defineProps<Props>();

// Functions
const monthNums = ref<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

// Month num (get emitted value)
const monthNumReceived = ref<number>(0);

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
      <SectionCalendarioMonth
        v-for="month in monthNums"
        :year="2024"
        :month="month"
        :steps="props.steps"
        :events="props.events"
        :toggle-month="false"
        :select-week="false"
        @custom:month-num="handleUpdate"
      />
    </div>
  </div>
</template>
