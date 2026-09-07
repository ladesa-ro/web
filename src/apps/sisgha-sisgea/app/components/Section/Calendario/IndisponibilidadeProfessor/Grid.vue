<script lang="ts" setup>
import { DIAS_SEMANA } from './-Helpers/types';
import type { IndisponibilidadeItem } from './-Helpers/types';

const props = defineProps<{
  items: IndisponibilidadeItem[];
}>();

const emit = defineEmits<{
  'block-click': [item: IndisponibilidadeItem];
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

function blockStyle(item: IndisponibilidadeItem) {
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
  <div class="u-flex u-gap-2 calendario-grid__wrapper">
    <div class="u-flex u-flex-col u-shrink-0 u-pt-8 calendario-grid__hours" style="height: 960px">
      <div
        v-for="hour in hourMarks"
        :key="hour"
        class="u-flex-1 u-pr-1 u-text-right calendario-grid__hour-mark"
      >
        {{ String(hour).padStart(2, '0') }}:00
      </div>
    </div>

    <div
      v-for="dia in DIAS_SEMANA"
      :key="dia.value"
      class="u-flex u-flex-col u-flex-1 calendario-grid__day"
    >
      <div class="u-text-xs u-font-semibold u-text-center u-pb-2 u-truncate">
        {{ dia.label.slice(0, 3) }}
      </div>

      <div
        class="u-relative u-flex-1 u-rounded-lg calendario-grid__day-track"
        style="height: 960px"
        @click="emit('empty-click', dia.value)"
      >
        <div
          v-for="hour in hourMarks"
          :key="hour"
          class="u-absolute calendario-grid__grid-line"
          :style="{
            top: `${((hour * 60 - RANGE_START_MIN) / RANGE_SPAN_MIN) * 100}%`,
          }"
        />

        <button
          v-for="item in itemsForDay(dia.value)"
          :key="item.id"
          type="button"
          class="u-absolute u-rounded-md u-px-1 u-py-0-5 u-text-left u-font-medium u-overflow-hidden calendario-grid__block"
          :class="{ 'bg-stripes': item.tipo !== 'BLOQUEIO' }"
          :style="blockStyle(item)"
          @click.stop="emit('block-click', item)"
        >
          {{ item.inicio.slice(0, 5) }}–{{ item.fim.slice(0, 5) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendario-grid__wrapper {
  overflow-x: auto;
}

.calendario-grid__hours {
  width: 3rem;
}

.calendario-grid__hour-mark {
  font-size: 0.688rem;
  color: var(--ladesa-grey-color);
  transform: translateY(-0.375rem);
}

.calendario-grid__day {
  min-width: 6.5rem;
}

.calendario-grid__day-track {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 20%);
  background-color: rgb(from var(--ladesa-grey-color) R G B / 5%);
  cursor: pointer;
}

.calendario-grid__grid-line {
  left: 0;
  right: 0;
  border-top: 1px solid rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.calendario-grid__block {
  left: 0.125rem;
  right: 0.125rem;
  font-size: 0.688rem;
  color: var(--ladesa-white-color);
  background-color: rgb(from var(--ladesa-red-color) R G B / 85%);
}

.bg-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.35) 0,
    rgba(255, 255, 255, 0.35) 4px,
    transparent 4px,
    transparent 8px
  );
}
</style>
