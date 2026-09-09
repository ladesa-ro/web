<script lang="ts" setup>
import type { Day } from './calendar-types';
import { dayjs } from '@ladesa-ro/web.utils';
const props = defineProps<Day>();
</script>

<template>
  <div
    class="ui-day-cell u-flex u-justify-center u-items-center u-rounded-lg"
    :class="{
      'ui-day-cell--empty': !props.date,
      'ui-day-cell--no-color': props.color === 'none',
      'ui-day-cell--occupied': props.occupied,
    }"
    :style="{ backgroundColor: props.color }"
  >
    <p
      class="ui-day-cell__label u-flex u-justify-center u-items-center u-font-bold u-w-full u-h-full"
      :class="{
        'ui-day-cell__label--hidden': !props.date,
        'ui-day-cell__label--today':
          dayjs(props.date).format('YYYY-MM-DD') ===
          dayjs().format('YYYY-MM-DD'),
      }"
    >
      {{ props.date ? dayjs(props.date).format('D') : '0' }}
    </p>
  </div>
</template>
