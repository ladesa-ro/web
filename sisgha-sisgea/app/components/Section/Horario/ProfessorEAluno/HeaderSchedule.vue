<script lang="ts" setup>
import IconClock from '~/components/Icons/Clock.vue';
import IconMoreItems from '~/components/Icons/MoreItems.vue';
import { capitalizeFirst } from '../-Helpers/CapitalizeFirst';
import { getWeekDays } from '../-Helpers/GetWeekDays';

// set month and week
const selectedDay = useCurrentDay();

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

const open = ref(false);
</script>

<template>
  <div
    class="flex flex-col max-lg:gap-4 lg:flex-row items-center justify-between"
  >
    <p
      class="flex items-center font-semibold max-lg:gap-2 text-sm lg:text-base"
    >
      {{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}

      <UIPopoverCalendar v-model="open">
        <IconsArrow
          :class="open ? 'rotate-90' : '-rotate-90'"
          class="text-ldsa-text-green transition-transform duration-300 m-3"
        />
      </UIPopoverCalendar>
    </p>

    <UIToggle
      class="min-w-full lg:min-w-[26.5rem]"
      :items="toggleItems"
      v-model="toggleSelectedItem"
    />
  </div>
</template>
