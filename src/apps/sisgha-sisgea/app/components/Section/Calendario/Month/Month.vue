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
  <div class="month-card u-flex u-flex-col u-overflow-hidden u-rounded-lg">
    <!-- Month Head -->
    <div class="month-head u-flex u-w-full u-justify-between u-items-center">
      <UIButtonArrow v-show="props.toggleMonth" @click="toggleMonth(-1)" />

      <h2 class="month-head__title u-text-center u-w-full u-font-bold">
        {{ dayjs(`${props.year}-${currentMonth}-01`).format('MMMM') }}
      </h2>

      <UIButtonArrow
        v-show="props.toggleMonth"
        class="month-head__arrow--reverse"
        @click="toggleMonth(1)"
      />
    </div>

    <!-- Days of Month -->
    <div class="month-days-grid u-grid u-gap-2">
      <!-- Name Columns -->
      <p
        v-for="item of weekDays"
        :key="item"
        class="u-font-semibold u-text-center u-text-xs"
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
        :occupied="monthDay.occupied"
      />

      <SectionCalendarioMonthDay
        v-for="lastEmptyDay in emptyDays.after"
        :key="`after-${lastEmptyDay}`"
        :date="''"
      />
    </div>
  </div>
</template>

<style scoped>
.month-card {
  border: 2px solid var(--ladesa-grey-color);
  height: min-content;
}

.month-head {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 60%);
  padding: 0.5rem;
}

@media (min-width: 768px) {
  .month-head {
    padding: 1rem;
  }
}

.month-head__title {
  color: var(--ladesa-white-color);
  text-transform: uppercase;
  font-size: 0.75rem;
}

@media (min-width: 640px) {
  .month-head__title {
    font-size: 0.875rem;
  }
}

@media (min-width: 768px) {
  .month-head__title {
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .month-head__title {
    font-size: 1.125rem;
  }
}

.month-head__arrow--reverse {
  transform: rotate(180deg);
}

.month-days-grid {
  padding: 1rem;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  place-items: center;
}

@media (min-width: 640px) {
  .month-days-grid {
    padding: 0.125rem;
  }
}

@media (min-width: 768px) {
  .month-days-grid {
    padding: 1rem;
  }
}
</style>
