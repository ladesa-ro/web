<script lang="ts" setup>
import { useRRuleState } from './useRRuleState';

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    disabled?: boolean;
    error?: string;
  }>(),
  { disabled: false }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
}>();

const {
  frequency,
  frequencySelected,
  frequencyItems,
  intervalStr,
  intervalSuffix,
  selectedDayLabels,
  weekdayMap,
  endCondition,
  endConditionItems,
  countStr,
  untilDate,
  toggleDay,
} = useRRuleState(props, emit);
</script>

<template>
  <div class="flex flex-col gap-4">
    <UIFormOptionFieldsSelect
      v-model="frequencySelected"
      :items="frequencyItems"
      label="Repetição"
      placeholder="Selecione"
      :disabled="disabled"
    />

    <template v-if="frequency !== 'none'">
      <div class="flex items-center gap-2">
        <span class="text-sm text-ldsa-grey shrink-0">A cada</span>
        <UIFormTextField
          v-model="intervalStr"
          name="rruleInterval"
          type="number"
          min="1"
          :disabled="disabled"
          class="w-20"
        />
        <span class="text-sm text-ldsa-grey shrink-0">{{
          intervalSuffix
        }}</span>
      </div>

      <div v-if="frequency === 'weekly'" class="flex flex-col gap-1.5">
        <span class="text-[0.813rem] font-semibold text-ldsa-grey"
          >Dias da semana</span
        >
        <div class="flex justify-between gap-1.5 w-full">
          <button
            v-for="day in weekdayMap"
            :key="day.label"
            type="button"
            :disabled="disabled"
            class="flex-1 text-center text-sm font-semibold py-2 px-1 rounded-xl border-2 border-ldsa-green-1 transition-colors"
            :class="[
              selectedDayLabels.includes(day.label)
                ? 'bg-ldsa-green-1 text-white'
                : 'text-ldsa-text-green',
            ]"
            @click="toggleDay(day.label)"
          >
            {{ day.label }}
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <UIFormOptionFieldsRadioGroup
          v-model="endCondition"
          :items="endConditionItems"
          label="Término"
          :disabled="disabled"
        />

        <div
          v-if="endCondition === 'count'"
          class="flex items-center gap-2 ml-7"
        >
          <UIFormTextField
            v-model="countStr"
            name="rruleCount"
            type="number"
            min="1"
            :disabled="disabled"
            class="w-20"
          />
          <span class="text-sm font-medium text-ldsa-text-default"
            >ocorrências</span
          >
        </div>

        <div
          v-if="endCondition === 'until'"
          class="flex items-center gap-2 ml-7"
        >
          <UIFormTextField
            v-model="untilDate"
            name="rruleUntil"
            type="date"
            :disabled="disabled"
            class="flex-1"
          />
        </div>
      </div>
    </template>

    <p v-if="error" class="text-ldsa-red text-xs font-semibold px-1">
      {{ error }}
    </p>
  </div>
</template>
