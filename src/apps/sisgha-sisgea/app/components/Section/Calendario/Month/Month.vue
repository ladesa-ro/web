<script lang="ts" setup>
// # IMPORT
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import type { CalendarEvent, Day, EmptyDays } from '../Types';
import { renderDays } from './RenderMonthDays';

// # CODE
type Props = {
  year: number;
  events: Array<CalendarEvent>;
  toggleMonth: boolean;
  calendarId: string;
  monthNum?: number;
};

const props = defineProps<Props>();

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Current month
const currentMonth = ref<number>(
  props.monthNum
    ? props.monthNum
    : Number(dayjs(`${props.year}-${dayjs().format('MM')}-01`).format('MM'))
);

// Empty Days
const emptyDays = ref<EmptyDays>({ before: 0, after: 0 });

// Month Days
const monthDays = ref<Day[]>();

// Set Month
async function setMonthDays() {
  monthDays.value = await renderDays.MonthDays(
    props.year,
    currentMonth.value,
    props.events ?? [],
    props.calendarId
  );

  emptyDays.value = renderDays.EmptyDays(props.year, currentMonth.value);
}

// Toggle Month
async function toggleMonth(number: number) {
  monthDays.value = [];
  currentMonth.value = currentMonth.value + number;
  if (currentMonth.value < 1) currentMonth.value = 12;
  else if (currentMonth.value > 12) currentMonth.value = 1;

  await setMonthDays();
}

onMounted(async () => {
  await setMonthDays();
});

watch(
  () => props.events,
  () => {
    setMonthDays().catch(console.error);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div
    class="flex flex-col border-2 border-ldsa-grey rounded-lg overflow-hidden h-min"
  >
    <!-- Month Head -->
    <div
      class="flex w-full justify-between items-center bg-ldsa-grey/60 p-2 xs:p-4 md:p-4"
    >
      <UIButtonArrow v-show="props.toggleMonth" @click="toggleMonth(-1)" />

      <h2
        class="text-ldsa-white uppercase text-center w-full font-bold text-xs sm:text-sm md:text-base lg:text-lg"
      >
        {{ dayjs(`${props.year}-${currentMonth}-01`).format('MMMM') }}
      </h2>

      <UIButtonArrow
        v-show="props.toggleMonth"
        class="rotate-180"
        @click="toggleMonth(1)"
      />
    </div>

    <!-- Days of Month -->
    <div
      class="grid p-4 xs:p-0.5 sm:p-0.5 md:p-4 gap-2 sm:gap-2 md:gap-2 grid-cols-7 place-items-center"
    >
      <!-- Name Columns -->
      <p
        v-for="item of weekDays"
        :key="item"
        class="font-semibold text-center text-xs"
      >
        {{ item }}
      </p>

      <!-- Days -->
      <SectionCalendarioMonthDay
        v-for="firstEmptyDay in emptyDays.before"
        :key="`before-${firstEmptyDay}`"
        :date="''"
      />

      <SectionCalendarioMonthDay
        v-for="(monthDay, idx) in monthDays"
        :key="monthDay.date ?? `day-${idx}`"
        :date="monthDay.date"
        :color="monthDay.color"
      />

      <SectionCalendarioMonthDay
        v-for="lastEmptyDay in emptyDays.after"
        :key="`after-${lastEmptyDay}`"
        :date="''"
      />
    </div>
  </div>
</template>
