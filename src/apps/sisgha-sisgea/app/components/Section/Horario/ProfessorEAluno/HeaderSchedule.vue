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
  <div class="header-schedule u-flex u-items-center u-justify-between">
    <p class="header-schedule__month u-flex u-items-center u-font-semibold">
      {{ month }} - Dias {{ firstWeekDay.day }} a {{ lastWeekDay.day }}

      <UIPopoverCalendar
        v-model="open"
        :selected-day="currentDay"
        @select="onSelectDay"
      >
        <IconsArrow
          :class="open ? 'header-schedule__arrow--open' : 'header-schedule__arrow--closed'"
          class="header-schedule__arrow"
        />
      </UIPopoverCalendar>
    </p>

    <UIToggle
      v-model="toggleSelectedItem"
      class="header-schedule__toggle"
      :items="toggleItems"
    />
  </div>
</template>

<style scoped>
.header-schedule {
  flex-direction: column;
  gap: var(--ui-space-4);
}

.header-schedule__month {
  gap: var(--ui-space-2);
  font-size: 0.875rem;
}

.header-schedule__arrow {
  margin: var(--ui-space-3);
  color: var(--ladesa-text-green-color);
  transition: transform var(--ui-duration-base) var(--ui-easing-standard);
}

.header-schedule__arrow--open {
  transform: rotate(90deg);
}

.header-schedule__arrow--closed {
  transform: rotate(-90deg);
}

.header-schedule__toggle {
  min-width: 100%;
}

@media (min-width: 1024px) {
  .header-schedule {
    flex-direction: row;
    gap: 0;
  }

  .header-schedule__month {
    font-size: 1rem;
  }

  .header-schedule__toggle {
    min-width: 26.5rem;
  }
}
</style>
