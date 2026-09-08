<script lang="ts" setup>
import {
  UNAVAILABILITY_WEEK_DAYS,
  type UnavailabilityItem,
} from './unavailability';

export type UnavailabilityGridProps = {
  items: UnavailabilityItem[];
};

const props = defineProps<UnavailabilityGridProps>();

const emit = defineEmits<{
  'block-click': [item: UnavailabilityItem];
  'empty-click': [diaSemana: number];
}>();

const RANGE_START_MIN = 6 * 60;
const RANGE_END_MIN = 22 * 60;
const RANGE_SPAN_MIN = RANGE_END_MIN - RANGE_START_MIN;

const hourMarks = Array.from(
  { length: RANGE_END_MIN / 60 - RANGE_START_MIN / 60 + 1 },
  (_, i) => RANGE_START_MIN / 60 + i
);

function toMinutes(time: string): number {
  const [h = '0', m = '0'] = time.split(':');
  return Number(h) * 60 + Number(m);
}

function blockStyle(item: UnavailabilityItem) {
  const start = Math.min(
    Math.max(toMinutes(item.inicio), RANGE_START_MIN),
    RANGE_END_MIN
  );
  const end = Math.min(
    Math.max(toMinutes(item.fim), RANGE_START_MIN),
    RANGE_END_MIN
  );

  const top = ((start - RANGE_START_MIN) / RANGE_SPAN_MIN) * 100;
  const height = Math.max(((end - start) / RANGE_SPAN_MIN) * 100, 1.5);

  return {
    top: `${top}%`,
    height: `${height}%`,
  };
}

function itemsForDay(dia: number) {
  return props.items.filter(item => item.diaSemana === dia);
}
</script>

<template>
  <div class="ui-unavailability-grid u-flex u-gap-2">
    <div
      class="ui-unavailability-grid__hours u-flex u-flex-col u-shrink-0 u-pt-8"
    >
      <div
        v-for="hour in hourMarks"
        :key="hour"
        class="ui-unavailability-grid__hour-mark u-flex-1 u-pr-1 u-text-right"
      >
        {{ String(hour).padStart(2, '0') }}:00
      </div>
    </div>

    <div
      v-for="dia in UNAVAILABILITY_WEEK_DAYS"
      :key="dia.value"
      class="ui-unavailability-grid__day u-flex u-flex-col u-flex-1"
    >
      <div class="u-text-xs u-font-semibold u-text-center u-pb-2 u-truncate">
        {{ dia.label.slice(0, 3) }}
      </div>

      <div
        class="ui-unavailability-grid__day-track u-relative u-flex-1 u-rounded-lg"
        @click="emit('empty-click', dia.value)"
      >
        <div
          v-for="hour in hourMarks"
          :key="hour"
          class="ui-unavailability-grid__grid-line u-absolute"
          :style="{
            top: `${((hour * 60 - RANGE_START_MIN) / RANGE_SPAN_MIN) * 100}%`,
          }"
        />

        <button
          v-for="item in itemsForDay(dia.value)"
          :key="item.id"
          type="button"
          class="ui-unavailability-grid__block u-absolute u-rounded-md u-px-1 u-py-0-5 u-text-left u-font-medium u-overflow-hidden"
          :class="{
            'ui-unavailability-grid__block--striped': item.tipo !== 'BLOQUEIO',
          }"
          :style="blockStyle(item)"
          @click.stop="emit('block-click', item)"
        >
          {{ item.inicio.slice(0, 5) }}–{{ item.fim.slice(0, 5) }}
        </button>
      </div>
    </div>
  </div>
</template>
