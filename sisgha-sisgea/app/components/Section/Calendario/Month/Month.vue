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
  monthName?: string;
  monthNum?: number;
};

const props = defineProps<Props>();

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Current month
let currentMonth = ref<number>(
  props.monthName
    ? props.monthNum! + 1
    : Number(dayjs(`${props.year}-${dayjs().format('MM')}-01`).format('M'))
);

function toggleMonth(number: number) {
  currentMonth.value = currentMonth.value + number;
  if (currentMonth.value < 1) currentMonth.value = 12;
  else if (currentMonth.value > 12) currentMonth.value = 1;
}

// Empty days
let emptyDays = ref<EmptyDays>(
  renderDays.EmptyDays(
    props.year,
    dayjs(`${props.year}-${currentMonth.value}-01`).format('MMMM')
  )
);
// Month days
let monthDays = ref<Day[]>();

onMounted(async () => {
  monthDays.value = await renderDays.MonthDays(
    props.year,
    currentMonth.value,
    props.events,
    props.calendarId
  );
});
</script>

<template>
  <div
    class="flex flex-col border-2 border-ldsa-grey rounded-lg overflow-hidden h-min"
  >
    <!-- Month Head -->
    <div class="flex w-full justify-between items-center bg-ldsa-grey/60 p-4">
      <UIButtonArrow @click="toggleMonth(-1)" v-show="props.toggleMonth" />

      <h2 class="text-ldsa-white uppercase text-center w-full font-bold">
        {{
          props.monthName
            ? props.monthName!
            : dayjs(`${props.year}-${currentMonth}-01`).format('MMMM')
        }}
      </h2>

      <UIButtonArrow
        class="rotate-180"
        @click="toggleMonth(1)"
        v-show="props.toggleMonth"
      />
    </div>

    <!-- Days of Month -->
    <div class="grid p-4 gap-4 grid-cols-7 place-items-center">
      <!-- Name Columns -->
      <p class="font-semibold text-center" v-for="item of weekDays">
        {{ item }}
      </p>

      <!-- Days -->
      <SectionCalendarioMonthDay v-for="firstEmptyDay in emptyDays.before" />

      <SectionCalendarioMonthDay
        v-for="monthDay in monthDays"
        :date="monthDay.date"
      />

      <SectionCalendarioMonthDay v-for="lastEmptyDay in emptyDays.after" />
    </div>
  </div>
</template>

<style></style>
