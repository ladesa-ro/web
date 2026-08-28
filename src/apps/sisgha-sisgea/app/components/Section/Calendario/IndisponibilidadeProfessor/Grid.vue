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
  <div class="flex gap-2 overflow-x-auto">
    <div class="flex flex-col shrink-0 w-12 pt-8" style="height: 960px">
      <div
        v-for="hour in hourMarks"
        :key="hour"
        class="flex-1 text-[0.688rem] text-ldsa-grey text-right pr-1 -translate-y-1.5"
      >
        {{ String(hour).padStart(2, '0') }}:00
      </div>
    </div>

    <div
      v-for="dia in DIAS_SEMANA"
      :key="dia.value"
      class="flex flex-col flex-1 min-w-[6.5rem]"
    >
      <div class="text-xs font-semibold text-center pb-2 truncate">
        {{ dia.label.slice(0, 3) }}
      </div>

      <div
        class="relative flex-1 rounded-lg border border-ldsa-grey/20 bg-ldsa-grey/5 cursor-pointer"
        style="height: 960px"
        @click="emit('empty-click', dia.value)"
      >
        <div
          v-for="hour in hourMarks"
          :key="hour"
          class="absolute left-0 right-0 border-t border-ldsa-grey/10"
          :style="{
            top: `${((hour * 60 - RANGE_START_MIN) / RANGE_SPAN_MIN) * 100}%`,
          }"
        />

        <button
          v-for="item in itemsForDay(dia.value)"
          :key="item.id"
          type="button"
          class="absolute left-0.5 right-0.5 rounded-md px-1 py-0.5 text-left text-[0.688rem] font-medium text-white overflow-hidden"
          :class="[
            item.tipo === 'BLOQUEIO'
              ? 'bg-ldsa-red/85'
              : 'bg-ldsa-red/85 bg-stripes',
          ]"
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
