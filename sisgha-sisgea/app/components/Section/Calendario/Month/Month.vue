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

//* Functions

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
    class="border-2 border-ldsa-grey rounded-lg min-w-max overflow-hidden"
  >
    <!-- calendar header -->
    <div
      :style="{ backgroundColor: monthColor }"
      class="text-ldsa-white flex justify-between items-center p-2.5 w-full"
    >
      <button class="px-3.5 py-2" @click="toggleMonth(-1)">
        <!-- Toggle for before month -->
        <IconsArrowIconArrow v-if="props.toggleMonth" class="text-ldsa-white" />
      </button>

      <!-- Month name -->
      <h1 class="font-medium text-center text-lg sm:text-xl w-full">
        {{
          capitalizeFirst(
            dayjs(`${props.year}-${monthNum + 1}-01`).format('MMMM')
          )
        }}
      </h1>

      <button class="px-3.5 py-2" @click="toggleMonth(1)">
        <IconsArrowIconArrow
          v-if="props.toggleMonth"
          class="text-ldsa-white rotate-180"
        />
      </button>
    </div>

    <!-- Calendar -->
    <section
      class="p-2.5 grid grid-cols-7 gap-1 sm:gap-2 justify-center items-center"
    >
      <!-- Days of the week -->
      <p v-for="dayInTheWeek in daysInTheWeek" class="calendar-text">
        {{ dayInTheWeek }}
      </p>

      <!-- Days -->
      <!-- Before -->
      <div
        v-for="daysBefore in calendarDays.emptyDays.before.value"
        :key="daysBefore"
        class="day"
      />

      <!-- In month -->
      <div
        v-for="(dayInMonth, index) in calendarDays.daysInMonth.value"
        :key="index"
        :class="{ 'cursor-pointer': props.selectWeek }"
        :style="{ backgroundColor: dayInMonth.color }"
        class="flex w-10 h-10 sm:w-12 sm:h-12 border-solid rounded-lg"
        @click="emitWeekSelected()"
        @mouseenter="hoverInWeek(dayInMonth.date, true)"
        @mouseleave="hoverInWeek(dayInMonth.date, false)"
      >
        <div class="flex w-full h-full justify-center items-center">
          <p
            :class="{
              'border-2 border-solid border-ldsa-white rounded-md':
                dayjs(dayjs().toDate()).format('YYYY-MM-DD') ==
                dayjs(dayjs(dayInMonth.date)).format('YYYY-MM-DD'),
            }"
            class="mx-auto w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center text-ldsa-white calendar-text"
          >
            {{ dayjs(dayInMonth.date).format('D') }}
          </p>
        </div>
      </div>
      <!-- After -->
      <div
        v-for="daysAfter in calendarDays.emptyDays.after.value"
        :key="daysAfter"
        class="day"
      />
    </section>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.day {
  @apply w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-ldsa-grey/50;
}

.calendar-text {
  @apply text-center text-sm sm:text-base font-semibold;
}
</style>
