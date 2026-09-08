<script setup lang="ts">
import { getWeekDays } from '~/utils/get-week-days';

const today = useCurrentDay();

const week = getWeekDays(today.value);
const weekFirstDay = week[0]!.dayMonth;
const weekLastDay = week[5]!.dayMonth;

//

const popoverOpen = defineModel<boolean>({ required: true, default: false });
</script>

<template>
  <UIPopoverCalendar v-model="popoverOpen">
    <UIButtonDefault :outline-on-clink="false" class="select-week-button">
      <template #start-icon>
        <IconsCalendar class="select-week-button__icon" />
      </template>

      {{ weekFirstDay }} - {{ weekLastDay }}
    </UIButtonDefault>
  </UIPopoverCalendar>
</template>

<style scoped>
/* used to win the specifity of UIButtonDefault classes */
button.select-week-button {
  padding-block: var(--ui-space-2);
  height: 100%;
}

@media (min-width: 1024px) {
  button.select-week-button {
    max-width: max-content;
    padding-block: 0;
  }
}

@media (max-width: 1023.98px) {
  .select-week-button__icon {
    width: 1.125rem;
  }
}
</style>
