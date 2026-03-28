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
    <UIButtonDefault
      :outline-on-clink="false"
      class="lg:max-w-max max-lg:py-3 button-height"
    >
      <template #start-icon>
        <IconsCalendar class="max-lg:w-4.5" />
      </template>

      {{ weekFirstDay }} - {{ weekLastDay }}
    </UIButtonDefault>
  </UIPopoverCalendar>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

/* used to win the specifity of UIButtonDefault classes */
button.button-height {
  @apply py-2 lg:py-0 h-full;
}
</style>
