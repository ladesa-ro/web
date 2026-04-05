<script lang="ts" setup>
import { RRule, type Weekday } from 'rrule';

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
}>();

type FrequencyOption = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
type EndCondition = 'never' | 'count' | 'until';

const frequencyNone: ParsedItem = { label: 'Não repetir', value: 'none' };
const frequencyItems: ParsedItem[] = [
  frequencyNone,
  { label: 'Diário', value: 'daily' },
  { label: 'Semanal', value: 'weekly' },
  { label: 'Mensal', value: 'monthly' },
  { label: 'Anual', value: 'yearly' },
];

const endConditionItems = [
  { label: 'Nunca', value: 'never' },
  { label: 'Após N ocorrências', value: 'count' },
  { label: 'Até uma data', value: 'until' },
];

const weekdayMap: { label: string; value: Weekday }[] = [
  { label: 'Seg', value: RRule.MO },
  { label: 'Ter', value: RRule.TU },
  { label: 'Qua', value: RRule.WE },
  { label: 'Qui', value: RRule.TH },
  { label: 'Sex', value: RRule.FR },
  { label: 'Sab', value: RRule.SA },
  { label: 'Dom', value: RRule.SU },
];

const weekdayItems = weekdayMap.map(d => d.label);

const frequencySelected = ref<ParsedItem | undefined>(frequencyNone);
const frequency = computed<FrequencyOption>(() =>
  (frequencySelected.value?.value as FrequencyOption) ?? 'none',
);

const interval = ref(1);
const selectedDayLabels = ref<string[]>([]);
const endCondition = ref<EndCondition>('never');
const count = ref(10);
const untilDate = ref('');

const intervalStr = computed({
  get: () => String(interval.value),
  set: (val: string | number) => { interval.value = Number(val) || 1; },
});

const countStr = computed({
  get: () => String(count.value),
  set: (val: string | number) => { count.value = Number(val) || 1; },
});

const frequencyToRRule: Record<Exclude<FrequencyOption, 'none'>, number> = {
  daily: RRule.DAILY,
  weekly: RRule.WEEKLY,
  monthly: RRule.MONTHLY,
  yearly: RRule.YEARLY,
};

const rruleFreqToOption: Record<number, FrequencyOption> = {
  [RRule.DAILY]: 'daily',
  [RRule.WEEKLY]: 'weekly',
  [RRule.MONTHLY]: 'monthly',
  [RRule.YEARLY]: 'yearly',
};

const intervalSuffix = computed(() => {
  const suffixes: Record<Exclude<FrequencyOption, 'none'>, string> = {
    daily: 'dia(s)',
    weekly: 'semana(s)',
    monthly: 'mês(es)',
    yearly: 'ano(s)',
  };
  if (frequency.value === 'none') return '';
  return suffixes[frequency.value];
});

function getSelectedWeekdays(): Weekday[] {
  return selectedDayLabels.value
    .map(label => weekdayMap.find(d => d.label === label))
    .filter((d): d is { label: string; value: Weekday } => d !== undefined)
    .map(d => d.value);
}

function toggleDay(label: string) {
  if (props.disabled) return;
  const idx = selectedDayLabels.value.indexOf(label);
  if (idx >= 0) {
    selectedDayLabels.value = selectedDayLabels.value.filter(l => l !== label);
  } else {
    selectedDayLabels.value = [...selectedDayLabels.value, label];
  }
}

function normalizeRRuleString(input: string): string {
  let str = input.trim();
  const lines = str.split('\n');
  const rruleLine = lines.find(l => l.startsWith('RRULE:') || l.startsWith('FREQ='));
  if (rruleLine) str = rruleLine;
  if (!str.startsWith('RRULE:')) str = 'RRULE:' + str;
  return str;
}

function parseModelValue(value: string | null) {
  if (!value) {
    frequencySelected.value = frequencyNone;
    interval.value = 1;
    selectedDayLabels.value = [];
    endCondition.value = 'never';
    count.value = 10;
    untilDate.value = '';
    return;
  }

  try {
    const normalized = normalizeRRuleString(value);
    const rule = RRule.fromString(normalized);
    const opts = rule.origOptions;

    if (opts.freq !== undefined && opts.freq !== null) {
      const freqOpt = rruleFreqToOption[opts.freq] ?? 'none';
      frequencySelected.value = frequencyItems.find(i => i.value === freqOpt) ?? frequencyNone;
    } else {
      frequencySelected.value = frequencyNone;
    }

    interval.value = opts.interval ?? 1;

    if (opts.byweekday) {
      const days = Array.isArray(opts.byweekday) ? opts.byweekday : [opts.byweekday];
      selectedDayLabels.value = days
        .filter(Boolean)
        .map(d => {
          const weekday = typeof d === 'number' ? d : typeof d === 'string' ? ['MO','TU','WE','TH','FR','SA','SU'].indexOf(d) : d.weekday;
          return weekdayMap[weekday]?.label;
        })
        .filter((label): label is string => label !== undefined);
    } else {
      selectedDayLabels.value = [];
    }

    if (opts.count) {
      endCondition.value = 'count';
      count.value = opts.count;
    } else if (opts.until) {
      endCondition.value = 'until';
      const d = opts.until;
      untilDate.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    } else {
      endCondition.value = 'never';
    }
  } catch {
    frequencySelected.value = frequencyNone;
  }
}

function buildRRuleString(): string | null {
  if (frequency.value === 'none') return null;

  const options: Partial<ConstructorParameters<typeof RRule>[0]> = {
    freq: frequencyToRRule[frequency.value],
    interval: interval.value,
  };

  if (frequency.value === 'weekly') {
    const days = getSelectedWeekdays();
    if (days.length > 0) options.byweekday = days;
  }

  if (endCondition.value === 'count' && count.value > 0) {
    options.count = count.value;
  } else if (endCondition.value === 'until' && untilDate.value) {
    const parts = untilDate.value.split('-').map(Number);
    options.until = new Date(Date.UTC(parts[0] ?? new Date().getFullYear(), (parts[1] ?? 1) - 1, parts[2] ?? 1, 23, 59, 59));
  }

  const rule = new RRule(options);
  const str = rule.toString();
  const lines = str.split('\n');
  const rruleLine = lines.find(l => l.startsWith('RRULE:'));
  return rruleLine ? rruleLine.replace('RRULE:', '') : str.replace('RRULE:', '');
}

let isInternalUpdate = false;

function emitRRule() {
  isInternalUpdate = true;
  emit('update:modelValue', buildRRuleString());
  nextTick(() => { isInternalUpdate = false; });
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (isInternalUpdate) return;
    parseModelValue(newVal);
  },
  { immediate: true },
);

watch(frequencySelected, () => {
  if (frequency.value === 'none') {
    selectedDayLabels.value = [];
    interval.value = 1;
    endCondition.value = 'never';
  }
  emitRRule();
});

watch(
  [interval, endCondition, count, untilDate, selectedDayLabels],
  () => {
    if (frequency.value !== 'none') emitRRule();
  },
);
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
        <span class="text-sm text-ldsa-grey shrink-0">{{ intervalSuffix }}</span>
      </div>

      <div v-if="frequency === 'weekly'" class="flex flex-col gap-1.5">
        <span class="text-[0.813rem] font-semibold text-ldsa-grey">Dias da semana</span>
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

        <div v-if="endCondition === 'count'" class="flex items-center gap-2 ml-7">
          <UIFormTextField
            v-model="countStr"
            name="rruleCount"
            type="number"
            min="1"
            :disabled="disabled"
            class="w-20"
          />
          <span class="text-sm font-medium text-ldsa-text-default">ocorrências</span>
        </div>

        <div v-if="endCondition === 'until'" class="flex items-center gap-2 ml-7">
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
  </div>
</template>

