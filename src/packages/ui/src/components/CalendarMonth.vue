<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { onMounted, ref, watch } from 'vue';
import ButtonArrow from './ButtonArrow.vue';
import CalendarDay from './CalendarDay.vue';
import { renderDays } from './calendar-month';
import type { CalendarEvent, Day, EmptyDays } from './calendar-types';

export type CalendarMonthProps = {
  year: number;
  events: Array<CalendarEvent>;
  toggleMonth: boolean;
  calendarId: string;
  monthNum?: number;
};

const props = defineProps<CalendarMonthProps>();

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const currentMonth = ref<number>(
  props.monthNum
    ? props.monthNum
    : Number(dayjs(`${props.year}-${dayjs().format('MM')}-01`).format('MM'))
);

const emptyDays = ref<EmptyDays>({ before: 0, after: 0 });

const monthDays = ref<Day[]>();

async function setMonthDays() {
  monthDays.value = await renderDays.MonthDays(
    props.year,
    currentMonth.value,
    props.events ?? [],
    props.calendarId
  );

  emptyDays.value = renderDays.EmptyDays(props.year, currentMonth.value);
}

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
  <div class="ui-calendar-month u-flex u-flex-col u-overflow-hidden u-rounded-lg">
    <div
      class="ui-calendar-month__head u-flex u-w-full u-justify-between u-items-center"
    >
      <ButtonArrow v-show="props.toggleMonth" @click="toggleMonth(-1)" />

      <h2 class="ui-calendar-month__title u-text-center u-w-full u-font-bold">
        {{ dayjs(`${props.year}-${currentMonth}-01`).format('MMMM') }}
      </h2>

      <ButtonArrow
        v-show="props.toggleMonth"
        class="ui-calendar-month__arrow--reverse"
        @click="toggleMonth(1)"
      />
    </div>

    <div class="ui-calendar-month__grid u-grid u-gap-2">
      <p
        v-for="item of weekDays"
        :key="item"
        class="u-font-semibold u-text-center u-text-xs"
      >
        {{ item }}
      </p>

      <CalendarDay
        v-for="firstEmptyDay in emptyDays.before"
        :key="`before-${firstEmptyDay}`"
        :date="''"
      />

      <CalendarDay
        v-for="(monthDay, idx) in monthDays"
        :key="monthDay.date ?? `day-${idx}`"
        :date="monthDay.date"
        :color="monthDay.color"
        :occupied="monthDay.occupied"
      />

      <CalendarDay
        v-for="lastEmptyDay in emptyDays.after"
        :key="`after-${lastEmptyDay}`"
        :date="''"
      />
    </div>
  </div>
</template>
