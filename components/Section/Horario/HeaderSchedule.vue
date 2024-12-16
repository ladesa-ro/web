<script setup lang="ts">
import { ref } from 'vue';
import { capitalizeFirst } from './-Helpers/CapitalizeFirst';
import { getWeekDays } from './-Helpers/GetWeekDays';
import SpeechBubblesCalendar from './SpeechBubblesCalendar/SpeechBubblesCalendar.vue';
import { ViewMode } from './ViewMode';

// set month and week
const selectedDay = useSelectedDay();

const month = capitalizeFirst(selectedDay.value.format('MMMM'));

const weekDays = getWeekDays(selectedDay.value);

const firstWeekDay = weekDays[0];
const lastWeekDay = weekDays[5];

const selectedOption = defineModel('option', {
  default: ViewMode.DAILY_SCHEDULE,
});
const notificationsButtonEl = ref(null);
</script>

<template>
  <div
    class="flex justify-between w-full mt-14 max-[1400px]:px-8 xl:max-w-screen-xl xl:mx-auto max-xl:px-0"
  >
    <div class="flex font-[600] items-center gap-2">
      <span>
        {{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}
      </span>

      <v-menu
        origin="auto"
        location="bottom center"
        transition="slide-y-transition"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props, isActive }">
          <IconsArrowIconArrow
            v-bind="props"
            ref="notificationsButtonEl"
            :class="[
              'arrow -rotate-90 cursor-pointer -icon-green',
              { down: isActive },
            ]"
          />
        </template>

        <SpeechBubblesCalendar :notificationsButtonEl="notificationsButtonEl" />
      </v-menu>
    </div>

    <section class="flex cursor-pointer max-[1300px]:hidden">
      <!--left button-->
      <div
        class="flex gap-2 items-center border-2 border-ldsa-grey/75 p-3 font-[600] rounded-l-lg text-ldsa-grey dark:text-ldsa-grey-2"
        :class="{
          active: selectedOption === ViewMode.GENERAL_SCHEDULE,
          'border-r-0': selectedOption !== ViewMode.GENERAL_SCHEDULE,
        }"
        @click="selectedOption = ViewMode.GENERAL_SCHEDULE"
      >
        <span>Horário geral</span>
        <IconsIconMoreItems
          class="w-5"
          :class="{
            '-icon-green': selectedOption === ViewMode.GENERAL_SCHEDULE,
            '-icon-light-green': selectedOption !== ViewMode.GENERAL_SCHEDULE,
          }"
        />
      </div>

      <!--right button-->
      <div
        class="flex gap-2 items-center border-2 border-ldsa-grey/75 p-3 font-[600] rounded-r-lg text-ldsa-grey dark:text-ldsa-grey-2"
        :class="{
          active: selectedOption === ViewMode.DAILY_SCHEDULE,
          'border-l-0': selectedOption !== ViewMode.DAILY_SCHEDULE,
        }"
        @click="selectedOption = ViewMode.DAILY_SCHEDULE"
      >
        <span>Horário do dia</span>
        <IconsIconClock
          class="w-5"
          :class="{
            '-icon-green': selectedOption === ViewMode.DAILY_SCHEDULE,
            '-icon-light-green': selectedOption !== ViewMode.DAILY_SCHEDULE,
          }"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.active {
  @apply border-ldsa-green-1 text-ldsa-green-1 bg-ldsa-green-1/10 dark:text-ldsa-green-2; /* bg-[#ebf8ef] */
}

.arrow {
  @apply text-ldsa-green-1 dark:text-ldsa-green-2;
  -moz-transition: all 0.5s linear;
  -webkit-transition: all 0.5s linear;
  transition: all 0.5s linear;
}

.arrow.down {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
