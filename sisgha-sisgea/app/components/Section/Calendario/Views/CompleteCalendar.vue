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
  <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
    <SectionCalendarioMonth
      v-for="month in monthNums"
      :events="props.events"
      :month="month"
      :select-week="false"
      :steps="props.steps"
      :toggle-month="false"
      :year="2024"
      @custom:month-num="handleUpdate"
    />
  </div>
</template>
