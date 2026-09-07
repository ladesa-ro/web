<script lang="ts" setup>
import FormRadioGroup from './FormRadioGroup.vue';
import FormSelect from './FormSelect.vue';
import FormTextField from './FormTextField.vue';
import { useRRuleEditorState } from './rrule-editor-state';

export type RRuleEditorProps = {
  modelValue: string | null;
  disabled?: boolean;
  error?: string;
};

const props = withDefaults(defineProps<RRuleEditorProps>(), { disabled: false });

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
} = useRRuleEditorState(props, emit);
</script>

<template>
  <div class="ui-rrule-editor">
    <FormSelect v-model="frequencySelected" :items="frequencyItems" label="Repetição" placeholder="Selecione" :disabled="disabled" />

    <template v-if="frequency !== 'none'">
      <div class="ui-rrule-editor__interval-row">
        <span class="ui-rrule-editor__interval-text">A cada</span>
        <FormTextField
          v-model="intervalStr"
          name="rruleInterval"
          type="number"
          min="1"
          :disabled="disabled"
          class="ui-rrule-editor__interval-input"
        />
        <span class="ui-rrule-editor__interval-text">{{ intervalSuffix }}</span>
      </div>

      <div v-if="frequency === 'weekly'" class="ui-rrule-editor__weekdays">
        <span class="ui-rrule-editor__weekdays-label">Dias da semana</span>
        <div class="ui-week-day-selector">
          <button
            v-for="day in weekdayMap"
            :key="day.label"
            type="button"
            :disabled="disabled"
            class="ui-week-day-selector__button ui-week-day-selector__button--compact"
            :class="selectedDayLabels.includes(day.label) ? 'ui-week-day-selector__button--selected' : 'ui-week-day-selector__button--unselected'"
            @click="toggleDay(day.label)"
          >
            {{ day.label }}
          </button>
        </div>
      </div>

      <div class="ui-rrule-editor__end-condition">
        <FormRadioGroup v-model="endCondition" :items="endConditionItems" label="Término" :disabled="disabled" />

        <div v-if="endCondition === 'count'" class="ui-rrule-editor__end-detail">
          <FormTextField v-model="countStr" name="rruleCount" type="number" min="1" :disabled="disabled" class="ui-rrule-editor__end-detail-input" />
          <span class="ui-rrule-editor__end-detail-text">ocorrências</span>
        </div>

        <div v-if="endCondition === 'until'" class="ui-rrule-editor__end-detail">
          <FormTextField v-model="untilDate" name="rruleUntil" type="date" :disabled="disabled" style="flex: 1 1 0%" />
        </div>
      </div>
    </template>

    <p v-if="error" class="ui-autocomplete__error" style="padding-inline: 0.25rem">{{ error }}</p>
  </div>
</template>
