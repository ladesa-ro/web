<script setup lang="ts">
import { capitalizeFirst } from './-Helpers/CapitalizeFirst';
import { getWeekDays } from './-Helpers/GetWeekDays';
import SpeechBubblesCalendar from './SpeechBubblesCalendar/SpeechBubblesCalendar.vue';
import { ViewMode } from './ViewMode';

// set month and week
const selectedDay = useSelectedDay();

const month = capitalizeFirst(selectedDay.value.format('MMMM'));

const weekDays = getWeekDays(selectedDay.value);

const firstWeekDay = weekDays[0]!;
const lastWeekDay = weekDays[5]!;

//

const selectedOption = defineModel('option', {
  default: ViewMode.DAILY_SCHEDULE,
});

//

const notificationsButtonEl = ref(null);

const open = ref(false);
</script>

<template>
  <div
    class="flex justify-between w-full mt-14 max-[1400px]:px-8 xl:max-w-screen-xl xl:mx-auto max-xl:px-0"
  >
    <div class="flex font-[600] items-center">
      <span>
        {{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}
      </span>

      <UIPopover v-model="open">
        <template #activator>
          <IconsArrowIconArrow
            ref="notificationsButtonEl"
            class="arrow cursor-pointer m-3"
            :class="open ? 'rotate-90' : '-rotate-90'"
          />
        </template>

        <SpeechBubblesCalendar
          :notifications-button-el="notificationsButtonEl"
        />
      </UIPopover>
    </div>

    <section class="flex cursor-pointer max-[1300px]:hidden">
      <!-- TODO: transformar em componente -->
      <!--left button-->
      <div
        class="flex gap-2 items-center border-2 border-ldsa-grey/75 p-3 font-[600] rounded-l-lg text-ldsa-grey"
        :class="{
          active: selectedOption === ViewMode.GENERAL_SCHEDULE,
          'border-r-0': selectedOption !== ViewMode.GENERAL_SCHEDULE,
        }"
        @click="selectedOption = ViewMode.GENERAL_SCHEDULE"
      >
        <span>Horário geral</span>
        <IconsIconMoreItems class="w-5" />
      </div>

      <!--right button-->
      <div
        class="flex gap-2 items-center border-2 border-ldsa-grey/75 p-3 font-[600] rounded-r-lg text-ldsa-grey"
        :class="{
          active: selectedOption === ViewMode.DAILY_SCHEDULE,
          'border-l-0': selectedOption !== ViewMode.DAILY_SCHEDULE,
        }"
        @click="selectedOption = ViewMode.DAILY_SCHEDULE"
      >
        <span>Horário do dia</span>
        <IconsIconClock class="w-5" />
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.active {
  @apply border-ldsa-green-1 bg-ldsa-green-1/10 text-ldsa-text-green;
}

.arrow {
  @apply text-ldsa-text-green transition-transform duration-300;
}

.arrow.down {
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
