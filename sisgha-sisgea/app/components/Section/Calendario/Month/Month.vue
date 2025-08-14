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

let _events = toRef(props, "events");

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Current month
let currentMonth = ref<number>(
  props.monthNum
    ? props.monthNum!
    : Number(dayjs(`${props.year}-${dayjs().format('MM')}-01`).format('MM'))
);

// Empty Days
let emptyDays = ref<EmptyDays>({ before: 0, after: 0 });

// Month Days
let monthDays = ref<Day[]>();

// Set Month
async function setMonthDays() {
  monthDays.value = await renderDays.MonthDays(
    props.year,
    currentMonth.value,
    _events.value,
    props.calendarId
  );

  emptyDays.value = renderDays.EmptyDays(props.year, currentMonth.value);

  console.log(_events.value)
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

await watch(() => props.events, (e) => {
  _events.value.splice(0, _events.value.length);
  _events.value.concat(e);
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
        {{ dayjs(`${props.year}-${currentMonth}-01`).format('MMMM') }}
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
      <SectionCalendarioMonthDay
        v-for="firstEmptyDay in emptyDays.before"
        :date="''"
      />

      <SectionCalendarioMonthDay
        v-for="monthDay in monthDays"
        :date="monthDay.date"
        :color="monthDay.color"
      />

      <SectionCalendarioMonthDay
        v-for="lastEmptyDay in emptyDays.after"
        :date="''"
      />
    </div>
  </div>
</template>

<style></style>
