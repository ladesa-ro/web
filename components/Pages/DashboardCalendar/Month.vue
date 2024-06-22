<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';

// Dayjs config
dayjs.locale('pt-br');
dayjs.extend(isBetween);

// --- Interface and types ---
type EventData = {
  id: string;
  type: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
};

type Step = Omit<EventData, 'type'> & {
  number: number;
};

type Event = Omit<EventData, 'type'> & {
  name: string;
  locale: string;
};

type Day = {
  num: number;
  day: string;
  date: dayjs.Dayjs;
  color: string;
  hoverActive: boolean;
};

// --- Props ---
const props = defineProps({
  year: Number,
  month: Number,
  toggleMonth: Boolean,
  selectWeek: Boolean,
  steps: Array<Step>,
  events: Array<Event>,
});

//  --- Month ---
const daysInTheWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

let monthNum = ref<number>(props.month!);
let monthColor = ref<string>('#9ab69e');

let calendarDays = {
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
  (e: 'custom:monthWeek', v: dayjs.Dayjs[]): void;
}>();

const callingMonthNum = (v: number) => {
  if (v !== null) emitMonthData('custom:monthNum', v);
};
const callingMonthWeek = (v: dayjs.Dayjs[]) => {
  if (v !== null) emitMonthData('custom:monthWeek', v);
};

//  --- Month data ---
// Set days from this month
async function setMonth(): Promise<void> {
  try {
    // Set empty days
    async function setEmptyDays(): Promise<boolean> {
      try {
        // Calc before days
        calendarDays.emptyDays.before.value = dayjs(
          `${props.year!}-${monthNum.value + 1}-01`
        ).day();
        calendarDays.emptyDays.after.value =
          7 * 6 -
          (calendarDays.emptyDays.before.value +
            calendarDays.daysInMonth.value.length);
        return true;
      } catch (error) {
        return false;
      }
    }

    // Set days
    async function setDays(): Promise<boolean> {
      try {
        calendarDays.daysInMonth.value = [];

        // Set days
        async function setDaysData(): Promise<boolean> {
          try {
            // Repeat loop
            for (
              let i = 0;
              i <
              dayjs(
                dayjs(`${props.year!}-${monthNum.value + 1}-01`)
              ).daysInMonth();
              i++
            ) {
              calendarDays.daysInMonth.value.push({
                num: i,
                day: dayjs(
                  `${props.year!}-${monthNum.value + 1}-${i + 1}`
                ).format('dddd'),
                date: dayjs(`${props.year!}-${monthNum.value + 1}-${i + 1}`),
                color: '#9ab69e',
                hoverActive: false,
              });
            }

            return true;
          } catch (error) {
            return false;
          }
        }

        // Set steps
        async function setDatesColor(): Promise<boolean> {
          try {
            // Set steps
            for (let i = 0; i < props.steps!.length; i++) {
              // Check if date is between the start or end of the month
              for (let j = 0; j < calendarDays.daysInMonth.value.length; j++) {
                // Set start and end day color
                if (
                  // Check if the date is between
                  dayjs(calendarDays.daysInMonth.value[j].date).isBetween(
                    props.steps![i].startDate,
                    props.steps![i].endDate,
                    'date',
                    '[]'
                  ) === true
                ) {
                  // Set color
                  calendarDays.daysInMonth.value[j].color =
                    props.steps![i].color;
                } else {
                }
              }
            }

            // Set events
            for (let i = 0; i < props.events!.length; i++) {
              // Check if date is between the start or end of the month
              for (let j = 0; j < calendarDays.daysInMonth.value.length; j++) {
                // Set start and end day color
                if (
                  // Check if the date is between
                  dayjs(calendarDays.daysInMonth.value[j].date).isBetween(
                    props.events![i].startDate,
                    props.events![i].endDate,
                    'date',
                    '[]'
                  )
                ) {
                  // Set color
                  calendarDays.daysInMonth.value[j].color =
                    props.events![i].color;
                } else {
                }
              }
            }

            return true;
          } catch (error) {
            return false;
          }
        }

        // Calling internal functions
        await setDaysData();
        await setDatesColor();
        await setEmptyDays();

        // Set month color
        for (let i = 0; i < props.steps!.length; i++) {
          if (
            // Check if month is between the start or end of the step
            dayjs(
              `${props.year!}-${monthNum.value + 1}-${dayjs(props.steps![i].startDate).date()}`
            ).isBetween(
              props.steps![i].startDate,
              props.steps![i].endDate,
              'date',
              '[]'
            ) === true ||
            dayjs(
              `${props.year!}-${monthNum.value + 1}-${dayjs(props.steps![i].endDate).date()}`
            ).isBetween(
              props.steps![i].startDate,
              props.steps![i].endDate,
              'date',
              '[]'
            ) === true
          ) {
            monthColor.value = props.steps![i].color;
            break;
          } else {
            monthColor.value = '#9ab69e';
          }
        }

        return true;
      } catch (error) {
        return false;
      }
    }

    // Calling internal functions
    await setDays();
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
const daysOfWeek = ref<dayjs.Dayjs[]>([]);

// Get dates of week
async function getWeek(date: dayjs.Dayjs): Promise<void> {
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
async function hoverInWeek(
  date: dayjs.Dayjs,
  enableHover: boolean
): Promise<void> {
  try {
    // Check if select week is enable
    if (props.selectWeek! === true) {
      // Set dates of week
      if (enableHover === true) await getWeek(date);

      // Set hover in all days
      if (daysOfWeek.value !== null) {
        for (let i = 0; i < 6; i++) {
          // Find day
          const dayItem = calendarDays.daysInMonth.value.find(
            (item) =>
              item.date.format('MM-DD') === daysOfWeek.value[i].format('MM-DD')
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
  <v-card class="-month mx-auto rounded-lg w-max h-max">
    <div
      class="text-white flex justify-between items-center p-3 pl-6 pr-6 w-full"
      :style="{ backgroundColor: monthColor }"
    >
      <!-- Toggle for before month -->
      <IconsArrowIconArrow
        class="text-white cursor-pointer"
        @click="toggleMonth(-1)"
        v-show="props.toggleMonth!"
      />
      <!-- Month name -->
      <h1 class="font-medium text-center text-lg sm:text-xl w-full">
        {{
          dayjs(`${props.year!}-${monthNum + 1}-01`)
            .format('MMMM')[0]
            .toUpperCase() +
          dayjs(`${props.year!}-${monthNum + 1}-01`)
            .format('MMMM')
            .slice(1)
            .toLowerCase()
        }}
      </h1>

      <!-- Toggle for after month -->
      <IconsArrowIconArrow
        class="text-white rotate-180 cursor-pointer"
        @click="toggleMonth(1)"
        v-show="props.toggleMonth!"
      />
    </div>

    <!-- Calendar -->
    <v-container
      class="-month-content grid grid-cols-7 gap-1 sm:gap-2 justify-center items-center"
    >
      <!-- Days of the week -->
      <p
        class="text-center text-sm sm:text-[16px] font-semibold"
        v-for="dayInTheWeek in daysInTheWeek"
      >
        {{ dayInTheWeek }}
      </p>

      <!-- Days -->
      <!-- Before -->
      <div
        class="-empty-day w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#9ab69e]"
        v-for="daysBefore in calendarDays.emptyDays.before.value"
        :key="daysBefore"
      ></div>

      <!-- In month -->
      <div
        v-for="(dayInMonth, index) in calendarDays.daysInMonth.value"
        :key="index"
        class="flex w-10 h-10 sm:w-12 sm:h-12 border-solid rounded-lg"
        :class="{ 'cursor-pointer': props.selectWeek }"
        :style="{ backgroundColor: dayInMonth.color }"
        @mouseenter="hoverInWeek(dayInMonth.date, true)"
        @mouseleave="hoverInWeek(dayInMonth.date, false)"
        @click="emitWeekSelected()"
      >
        <!-- Hover -->
        <div
          class="flex w-full h-full justify-center items-center"
          :class="{
            '-hover-off ': dayInMonth.hoverActive !== true,
            '-hover-on ': dayInMonth.hoverActive === true,
          }"
        >
          <p
            :class="{
              'border-2 border-solid border-white rounded-md':
                dayjs(dayjs().toDate()).format('YYYY-MM-DD') ==
                dayjs(dayjs(dayInMonth.date)).format('YYYY-MM-DD'),
            }"
            class="mx-auto w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center text-center text-white font-semibold text-sm sm:text-[16px]"
          >
            {{ dayjs(dayInMonth.date).format('D') }}
          </p>
        </div>
      </div>
      <!-- After -->
      <div
        class="-empty-day w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#9ab69e]"
        v-for="daysAfter in calendarDays.emptyDays.after.value"
        :key="daysAfter"
      ></div>
    </v-container>
  </v-card>
</template>

<style scoped>
.-month {
  border: solid 2px #9ab69e;
  box-shadow: none;
  margin: 0;
}

.-month-content {
  padding: 10px;
}

.-hover-on {
  background-color: #ffffff40;
}
.-hover-off {
  background-color: #ffffff00;
}
</style>
