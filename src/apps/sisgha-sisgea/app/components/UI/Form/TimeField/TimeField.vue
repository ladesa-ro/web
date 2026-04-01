<script setup lang="ts">
import { Time } from '@internationalized/date';
import {
  TimeFieldInput,
  TimeFieldRoot,
} from 'reka-ui';

const props = defineProps<{
  label?: string;
  disabled?: boolean;
  error?: string;
  readonly?: boolean;
  granularity?: 'hour' | 'minute' | 'second';
}>();

const modelValue = defineModel<string | null>({ default: null });

function parseTime(value: string | null): Time | undefined {
  if (!value) return undefined;
  const parts = value.split(':').map(Number);
  return new Time(parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0);
}

function formatTime(time: Time | undefined): string | null {
  if (!time) return null;
  const h = String(time.hour).padStart(2, '0');
  const m = String(time.minute).padStart(2, '0');
  return `${h}:${m}`;
}

const internalValue = computed({
  get: () => parseTime(modelValue.value),
  set: (val: Time | undefined) => {
    modelValue.value = formatTime(val);
  },
});

const hasError = computed(() => !!props.error);
</script>

<template>
  <div class="flex flex-col gap-1">
    <TimeFieldRoot
      v-slot="{ segments }"
      v-model="internalValue"
      :hour-cycle="24"
      :granularity="granularity ?? 'minute'"
      :disabled="disabled"
      :readonly="readonly"
      class="input-base"
      :class="{ 'has-error': hasError }"
    >
      <label v-if="label">{{ label }}</label>

      <div class="flex items-center gap-0.5 py-2 tabular-nums">
        <template v-for="(segment, i) in segments" :key="i">
          <span
            v-if="segment.part === 'literal'"
            class="text-ldsa-grey select-none"
          >
            {{ segment.value }}
          </span>
          <TimeFieldInput
            v-else
            :part="segment.part"
            class="rounded px-0.5 py-0.5 text-ldsa-text-default focus:bg-ldsa-green-2/15 focus:outline-none data-placeholder:text-ldsa-grey/60"
          />
        </template>
      </div>
    </TimeFieldRoot>

    <p v-if="error" class="text-ldsa-red text-xs font-semibold px-1">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
@import "~/components/UI/Form/-Utils/style/inputStyles.css";
</style>
