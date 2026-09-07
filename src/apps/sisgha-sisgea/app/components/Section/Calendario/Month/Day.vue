<script lang="ts" setup>
// # IMPORT
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import type { Day } from '../Types';

// # CODE
const props = defineProps<Day>();
</script>

<template>
  <div
    class="day-cell u-flex u-justify-center u-items-center u-rounded-lg"
    :class="{
      'day-cell--empty': !props.date,
      'day-cell--no-color': props.color === 'none',
      'day-cell--occupied': props.occupied,
    }"
    :style="{ backgroundColor: props.color }"
  >
    <p
      class="day-cell__label u-flex u-justify-center u-items-center u-font-bold u-w-full u-h-full"
      :class="{
        'day-cell__label--hidden': !props.date,
        'day-cell__label--today':
          dayjs(props.date).format('YYYY-MM-DD') ===
          dayjs().format('YYYY-MM-DD'),
      }"
    >
      {{ props.date ? dayjs(props.date).format('D') : '0' }}
    </p>
  </div>
</template>

<style scoped>
.day-cell {
  aspect-ratio: 1 / 1;
  width: 1.5rem;
  padding: 1rem;
}

@media (min-width: 640px) {
  .day-cell {
    width: 1.5rem;
    padding: 0.25rem;
  }
}

@media (min-width: 768px) {
  .day-cell {
    width: 2rem;
    padding: 0.375rem;
  }
}

@media (min-width: 1024px) {
  .day-cell {
    width: 2.5rem;
  }
}

.day-cell--empty {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.day-cell--no-color {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 60%);
}

.day-cell--occupied {
  background-image: repeating-linear-gradient(
    135deg,
    rgba(107, 114, 128, 0.6) 0,
    rgba(107, 114, 128, 0.6) 2px,
    transparent 2px,
    transparent 6px
  );
}

.day-cell__label {
  color: var(--ladesa-white-color);
}

.day-cell__label--hidden {
  visibility: hidden;
}

.day-cell__label--today {
  border: 2px solid var(--ladesa-white-color);
  border-radius: var(--ui-radius-md);
}
</style>
