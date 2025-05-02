<script setup lang="ts">
import { getWeekDays } from '../../../-Helpers/GetWeekDays';

const today = useCurrentDay();

const week = getWeekDays(today.value);
const weekFirstDay = week[0]!.dayMonth;
const weekLastDay = week[5]!.dayMonth;

//

const popoverOpen = defineModel<boolean>({ required: true, default: false });
</script>

<template>
  <UIPopoverCalendar v-model="popoverOpen">
    <UIButtonDefault :outline-on-clink="false" class="max-w-max button-height">
      <template #start-icon>
        <IconsCalendarIconCalendar />
      </template>

      {{ weekFirstDay }} - {{ weekLastDay }}
    </UIButtonDefault>
  </UIPopoverCalendar>
</template>

<style scoped>
/* used to win the specifity of UIButtonDefault classes */
button.button-height {
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
}
</style>
