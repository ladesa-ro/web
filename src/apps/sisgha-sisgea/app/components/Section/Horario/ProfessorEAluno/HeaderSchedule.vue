<script lang="ts" setup>
import { IconsClock, IconsMoreItems } from '#components';
import { capitalizeFirst } from '@ladesa-ro/web.utils';
import { getWeekDays } from '~/utils/get-week-days';
import type { Dayjs } from 'dayjs';

const currentDay = useCurrentDay();

const month = computed(() => capitalizeFirst(currentDay.value.format('MMMM')));

const weekDays = computed(() => getWeekDays(currentDay.value));

const firstWeekDay = computed(() => weekDays.value[0]!);
const lastWeekDay = computed(() => weekDays.value[5]!);

const toggleItems = [
  { text: 'Horário da semana', value: 'semana', icon: IconsMoreItems },
  { text: 'Horário do dia', value: 'dia', icon: IconsClock },
];

const toggleSelectedItem = defineModel<string | number>('toggleOption', {
  required: true,
  default: 'dia',
});

const open = ref(false);

function onSelectDay(day: Dayjs) {
  currentDay.value = day;
}
</script>

<template>
  <div
    class="flex flex-col max-lg:gap-4 lg:flex-row items-center justify-between"
  >
    <p
      class="flex items-center font-semibold max-lg:gap-2 text-sm lg:text-base"
    >
      {{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}

      <UIPopoverCalendar
        v-model="open"
        :selected-day="currentDay"
        @select="onSelectDay"
      >
        <IconsArrow
          :class="open ? 'rotate-90' : '-rotate-90'"
          class="text-ldsa-text-green transition-transform duration-300 m-3"
        />
      </UIPopoverCalendar>
    </p>

    <UIToggle
      v-model="toggleSelectedItem"
      class="min-w-full lg:min-w-[26.5rem]"
      :items="toggleItems"
    />
  </div>
</template>
