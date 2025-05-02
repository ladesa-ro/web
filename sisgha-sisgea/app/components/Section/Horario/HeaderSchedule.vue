<script lang="ts" setup>
import IconClock from '~/components/Icons/IconClock.vue';
import IconMoreItems from '~/components/Icons/IconMoreItems.vue';
import { capitalizeFirst } from './-Helpers/CapitalizeFirst';
import { getWeekDays } from './-Helpers/GetWeekDays';
import SpeechBubblesCalendar from './SpeechBubblesCalendar/SpeechBubblesCalendar.vue';

// set month and week
const selectedDay = useSelectedDay();

const month = capitalizeFirst(selectedDay.value.format('MMMM'));

const weekDays = getWeekDays(selectedDay.value);

const firstWeekDay = weekDays[0]!;
const lastWeekDay = weekDays[5]!;

//

const toggleItems = [
  { text: 'Horário da semana', value: 'semana', icon: IconMoreItems },
  { text: 'Horário do dia', value: 'dia', icon: IconClock },
];

const toggleSelectedItem = defineModel<string | number>('toggleOption', {
  required: true,
  default: 'dia',
});

//

const notificationsButtonEl = ref(null);

const open = ref(false);
</script>

<template>
  <div class="flex flex-col max-lg:gap-4 lg:flex-row items-center justify-between">
    <p class="flex items-center font-semibold max-lg:gap-2 text-sm lg:text-base">
      {{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}

      <UIPopover v-model="open">
        <template #activator>
          <IconsArrowIconArrow
            ref="notificationsButtonEl"
            :class="open ? 'rotate-90' : '-rotate-90'"
            class="text-ldsa-text-green transition-transform duration-300 cursor-pointer m-3"
          />
        </template>

        <SpeechBubblesCalendar
          :notifications-button-el="notificationsButtonEl"
        />
      </UIPopover>
    </p>

    <UIToggle
      class="min-w-full lg:min-w-[26.5rem]"
      :items="toggleItems"
      v-model="toggleSelectedItem"
    />
  </div>
</template>
