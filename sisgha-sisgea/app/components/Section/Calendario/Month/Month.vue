<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { capitalizeFirst } from '../../Horario/-Helpers/CapitalizeFirst';
import type { Day, Event, Step } from '../Typings';
import { getEmptyDays } from './Functions/GetEmptyDays';
import { getMonth } from './Functions/GetMonth';

const dayjs = useDayJs();

//

type Props = {
  year: number;
  month: number;
  toggleMonth: boolean;
  selectWeek: boolean;
  steps?: Step[];
  events?: Event[];
};
const props = defineProps<Props>();

//  --- Month ---
const daysInTheWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const monthNum = ref<number>(props.month!);
const monthColor = ref<string>('var(--ladesa-grey-color)');

const calendarDays = {
  daysInMonth: ref<Day[]>([]),
  emptyDays: {
    before: ref<number>(0),
    after: ref<number>(0),
  },
};

// Functions

//  --- Month data (emit values)  ---
const emitMonthData = defineEmits<{
  // Month number
  (e: 'custom:monthNum', v: number): void;
  // Week of month
  (e: 'custom:monthWeek', v: Dayjs[]): void;
}>();

const callingMonthNum = (v: number) => {
  if (v !== null) emitMonthData('custom:monthNum', v);
};
const callingMonthWeek = (v: Dayjs[]) => {
  if (v !== null) emitMonthData('custom:monthWeek', v);
};

//  --- Month data ---
// Set days from this month
async function setMonth(): Promise<void> {
  try {
    // Set days
    calendarDays.daysInMonth.value = await getMonth.getMonthData(
      props.year,
      monthNum.value,
      props.steps,
      props.events
    );

    monthColor.value = await getMonth.getMonthColor(
      props.steps ?? [],
      props.year,
      monthNum.value
    );

    // Set empty days
    // before
    calendarDays.emptyDays.before.value = await getEmptyDays(
      props.year,
      monthNum.value,
      calendarDays.daysInMonth.value.length,
      'before'
    );

    // after
    calendarDays.emptyDays.after.value = await getEmptyDays(
      props.year,
      monthNum.value,
      calendarDays.daysInMonth.value.length,
      'after'
    );

    callingMonthNum(monthNum.value);
  } catch (error) {}
}

// Toggle month
async function toggleMonth(num: number): Promise<void> {
  try {
    // Toggle
    monthNum.value += num;

    if (monthNum.value > 11) monthNum.value = 0;
    else if (monthNum.value < 0) monthNum.value = 11;

    // Calling functions
    await setMonth();
    callingMonthNum(monthNum.value);
  } catch (error) {}
}

// --- Select week ---
const daysOfWeek = ref<Dayjs[]>([]);

// Get dates of week
async function getWeek(date: Dayjs): Promise<void> {
  try {
    // Check if select week is enable
    if (props.selectWeek! === true) {
      // Set dates
      for (let i = 1; i <= 6; i++) {
        daysOfWeek.value.push(dayjs(date).startOf('week').add(i, 'day'));
      }
    }
  } catch (error) {}
}

async function emitWeekSelected(): Promise<void> {
  try {
    if (props.selectWeek! === true) {
      callingMonthWeek(daysOfWeek.value);
    }
  } catch (error) {}
}

// Set hover
async function hoverInWeek(date: Dayjs, enableHover: boolean): Promise<void> {
  try {
    // Check if select week is enable
    if (props.selectWeek! === true) {
      // Set dates of week
      if (enableHover === true) await getWeek(date);

      // Set hover in all days
      if (daysOfWeek.value !== null) {
        for (let i = 0; i < 6; i++) {
          // Find day
          const dayOfWeek = daysOfWeek.value[i]!;
          const dayItem = calendarDays.daysInMonth.value.find(
            item => item.date.format('MM-DD') === dayOfWeek.format('MM-DD')
          );

          // Active hover
          if (dayItem) {
            if (enableHover) dayItem!.hoverActive = true;
            else dayItem!.hoverActive = false;
          }
        }
      }

      // Clear array
      if (enableHover === false) daysOfWeek.value = [];
    }
  } catch (error) {}
}

onMounted(async () => {
  // Calling functions
  await setMonth();
});
</script>

<template>
  <div
    class="border-2 border-ldsa-grey rounded-lg min-w-max max-[440px]:w-full min-[440px]:max-w-lg max-h-max overflow-hidden min-h-max"
  >
    <!-- header -->
    <div
      :style="{ backgroundColor: monthColor }"
      class="text-white flex justify-between items-center p-2.5 w-full"
    >
      <button
        v-if="props.toggleMonth"
        class="px-3.5 py-2"
        @click="toggleMonth(-1)"
      >
        <!-- Toggle for before month -->
        <IconsArrowIconArrow />
      </button>

      <!-- Month name -->
      <h1 class="font-medium text-center text-lg sm:text-xl w-full">
        {{
          capitalizeFirst(
            dayjs(`${props.year}-${monthNum + 1}-01`).format('MMMM')
          )
        }}
      </h1>

      <button
        v-if="props.toggleMonth"
        class="px-3.5 py-2"
        @click="toggleMonth(1)"
      >
        <IconsArrowIconArrow class="rotate-180" />
      </button>
    </div>

    <!-- weeks -->
    <section
      class="p-2.5 grid grid-cols-7 justify-items-center max-[440px]:gap-1 min-[440px]:gap-2 sm:gap-3 justify-center items-center"
    >
      <!-- name of the days of the week -->
      <p
        v-for="dayInTheWeek in daysInTheWeek"
        class="calendar-text flex justify-center items-center"
      >
        {{ dayInTheWeek }}
      </p>

      <!-- days before current month -->
      <div
        v-for="daysBefore in calendarDays.emptyDays.before.value"
        :key="daysBefore"
        class="day-of-other-month"
      />

      <!-- days in current month -->
      <div
        v-for="(dayInMonth, index) in calendarDays.daysInMonth.value"
        :key="index"
        :class="{ 'cursor-pointer': props.selectWeek }"
        :style="{ backgroundColor: dayInMonth.color }"
        class="day flex border-solid"
        @click="emitWeekSelected()"
        @mouseenter="hoverInWeek(dayInMonth.date, true)"
        @mouseleave="hoverInWeek(dayInMonth.date, false)"
      >
        <p
          :class="{
            'border-2 border-solid border-white rounded-sm sm:rounded-md':
              dayjs(dayjs().toDate()).format('YYYY-MM-DD') ===
              dayjs(dayjs(dayInMonth.date)).format('YYYY-MM-DD'),
          }"
          class="flex-1 m-1 flex justify-center items-center text-white calendar-text"
        >
          {{ dayjs(dayInMonth.date).format('D') }}
        </p>
      </div>

      <!-- days after current month -->
      <div
        v-for="daysAfter in calendarDays.emptyDays.after.value"
        :key="daysAfter"
        class="day-of-other-month"
      />
    </section>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.day,
.day-of-other-month {
  @apply max-[440px]:min-w-8 max-[440px]:min-h-8 min-[440px]:min-w-10 min-[440px]:min-h-10 sm:min-w-12 sm:min-h-12 rounded-sm sm:rounded-lg;
}

.day-of-other-month {
  @apply bg-ldsa-grey/50;
}

.calendar-text {
  @apply text-center text-sm sm:text-base font-semibold;
}
</style>
