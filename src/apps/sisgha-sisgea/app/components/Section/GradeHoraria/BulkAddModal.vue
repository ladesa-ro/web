<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import ModalBaseLayout from '~/components/Dialog/Modal/ModalBaseLayout.vue';
import type { BulkAddParams } from '~/composables/useGradeHorariaEditor';
import { classificarPeriodo, type Periodo } from '~/utils/horarios';

const props = defineProps<{
  defaultPeriodo?: Periodo;
}>();

const emit = defineEmits<{
  confirm: [params: BulkAddParams];
  close: [];
}>();

const periodoDefaults: Record<Periodo, string> = {
  Matutino: '07:30',
  Vespertino: '13:00',
  Noturno: '19:00',
};

const periodoItems = [
  { text: 'Matutino', value: 'Matutino' },
  { text: 'Vespertino', value: 'Vespertino' },
  { text: 'Noturno', value: 'Noturno' },
];

// const modeItems = [
//   { text: 'Acrescentar', value: 'append' },
//   { text: 'Substituir', value: 'replace' },
// ];

const selectedPeriodo = ref<Periodo>(props.defaultPeriodo ?? 'Matutino');
const mode = ref<'append' | 'replace'>('append');

useForm({
  initialValues: {
    startTime: periodoDefaults[selectedPeriodo.value],
    classCount: 5,
    classDuration: 50,
    breakDuration: 20,
    breakAfterClass: 3,
  },
});

const { value: startTime } = useField<string>('startTime');
const { value: classCount } = useField<number>('classCount');
const { value: classDuration } = useField<number>('classDuration');
const { value: breakDuration } = useField<number>('breakDuration');
const { value: breakAfterClass } = useField<number>('breakAfterClass');

// Auto-update startTime when turno changes via toggle (only if current time is outside the new turno range)
watch(selectedPeriodo, periodo => {
  const current = startTime.value;
  if (!current || classificarPeriodo(current) !== periodo) {
    startTime.value = periodoDefaults[periodo];
  }
});

// Auto-switch turno when startTime changes manually
watch(startTime, time => {
  if (!time) return;
  const detected = classificarPeriodo(time);
  if (detected !== selectedPeriodo.value) {
    selectedPeriodo.value = detected;
  }
});

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number) as [number, number];
  const total = h * 60 + m + minutes;
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

const classCountNum = computed(() => Number(classCount.value) || 0);
const classDurationNum = computed(() => Number(classDuration.value) || 0);
const breakDurationNum = computed(() => Number(breakDuration.value) || 0);
const breakAfterClassNum = computed(() => Number(breakAfterClass.value) || 0);

const preview = computed(() => {
  if (classCountNum.value < 1 || classDurationNum.value < 1 || !startTime.value)
    return [];
  const intervals: Array<{
    inicio: string;
    fim: string;
    isAfterBreak: boolean;
  }> = [];
  let cursor = startTime.value;

  for (let i = 1; i <= classCountNum.value; i++) {
    const fim = addMinutes(cursor, classDurationNum.value);
    const isAfterBreak =
      breakAfterClassNum.value > 0 && i === breakAfterClassNum.value + 1;
    intervals.push({ inicio: cursor, fim, isAfterBreak });
    cursor = fim;
    if (
      breakAfterClassNum.value > 0 &&
      i === breakAfterClassNum.value &&
      i < classCountNum.value
    ) {
      cursor = addMinutes(cursor, breakDurationNum.value);
    }
  }

  return intervals;
});

const isValid = computed(
  () =>
    classCountNum.value >= 1 &&
    classDurationNum.value >= 1 &&
    startTime.value &&
    (breakAfterClassNum.value === 0 ||
      breakAfterClassNum.value < classCountNum.value)
);

function handleConfirm() {
  if (!isValid.value) return;
  emit('confirm', {
    startTime: startTime.value,
    classCount: classCountNum.value,
    classDuration: classDurationNum.value,
    breakDuration: breakDurationNum.value,
    breakAfterClass: breakAfterClassNum.value,
    periodo: selectedPeriodo.value,
    mode: mode.value,
  });
}
</script>

<template>
  <ModalBaseLayout
    title="Adicionar horários em massa"
    :close-button="true"
    :on-close="() => emit('close')"
    class="bulk-add-modal"
  >
    <div class="u-flex u-flex-col u-gap-4">
      <!-- Turno toggle -->
      <div class="u-flex u-flex-col u-gap-1">
        <label class="u-text-xs u-font-medium bulk-add-modal__label">Turno</label>
        <UIToggle v-model="selectedPeriodo" :items="periodoItems" />
      </div>

      <div class="u-grid u-gap-3 bulk-add-modal__grid">
        <VVTimeField name="startTime" label="Horário inicial" />
        <VVTextField
          name="classCount"
          label="Quantidade de aulas"
          type="number"
          placeholder="5"
        />
        <VVTextField
          name="classDuration"
          label="Duração da aula (min)"
          type="number"
          placeholder="50"
        />
        <VVTextField
          name="breakDuration"
          label="Duração do intervalo (min)"
          type="number"
          placeholder="20"
        />

        <div class="bulk-add-modal__col-span-2">
          <VVTextField
            name="breakAfterClass"
            label="Intervalo após aula nº (0 = sem intervalo)"
            type="number"
            placeholder="3"
          />
        </div>
      </div>

      <!-- Preview -->
      <div
        v-if="preview.length > 0"
        class="u-rounded-md u-p-3 bulk-add-modal__preview"
      >
        <p class="u-text-xs u-font-medium u-mb-2 bulk-add-modal__preview-title">
          Prévia dos horários:
        </p>
        <div class="u-flex u-flex-col u-gap-1">
          <div
            v-for="(item, i) in preview"
            :key="i"
            class="u-text-sm bulk-add-modal__preview-item"
          >
            <div
              v-if="item.isAfterBreak"
              class="u-text-xs u-mb-0-5 bulk-add-modal__break-note"
            >
              — intervalo de {{ breakDurationNum }} min —
            </div>
            <span class="u-font-medium">Aula {{ i + 1 }}:</span>
            {{ item.inicio }} - {{ item.fim }}
          </div>
        </div>
      </div>

      <!-- Modo toggle (comentado — sempre usa "append") -->
      <!-- <div class="u-flex u-flex-col u-gap-1">
        <label class="u-text-xs u-font-medium bulk-add-modal__label">Modo</label>
        <UIToggle v-model="mode" :items="modeItems" />
      </div> -->
    </div>

    <template #button-group>
      <UIButtonModalCancel
        type="close"
        @click="emit('close')"
      />
      <UIButtonModalCommonButtonsGreenWithCheck
        text="Adicionar"
        :disabled="!isValid"
        @click.prevent="handleConfirm"
      />
    </template>
  </ModalBaseLayout>
</template>

<style scoped>
@media (min-width: 640px) {
  .bulk-add-modal {
    max-width: 32rem !important;
  }
}

.bulk-add-modal__label {
  color: var(--ladesa-text-default-color);
}

.bulk-add-modal__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.bulk-add-modal__col-span-2 {
  grid-column: span 2 / span 2;
}

.bulk-add-modal__preview {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.bulk-add-modal__preview-title {
  color: var(--ladesa-grey-color);
}

.bulk-add-modal__preview-item {
  color: var(--ladesa-text-default-color);
}

.bulk-add-modal__break-note {
  color: var(--ladesa-grey-color);
  font-style: italic;
}
</style>
