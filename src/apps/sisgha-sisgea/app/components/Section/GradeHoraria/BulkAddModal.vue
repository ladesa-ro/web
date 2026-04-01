<script setup lang="ts">
import type { BulkAddParams } from '~/composables/useGradeHorariaEditor';
import ModalBaseLayout from '~/components/Dialog/Modal/ModalBaseLayout.vue';

const props = defineProps<{
  defaultStartTime?: string;
}>();

const emit = defineEmits<{
  confirm: [params: BulkAddParams];
  close: [];
}>();

const startTime = ref(props.defaultStartTime ?? '07:30');
const classCount = ref(5);
const classDuration = ref(50);
const breakDuration = ref(20);
const breakAfterClass = ref(2);

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number) as [number, number];
  const total = h * 60 + m + minutes;
  const hh = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

const preview = computed(() => {
  if (classCount.value < 1 || classDuration.value < 1) return [];
  const intervals: Array<{ inicio: string; fim: string; isAfterBreak: boolean }> = [];
  let cursor = startTime.value;

  for (let i = 1; i <= classCount.value; i++) {
    const fim = addMinutes(cursor, classDuration.value);
    const isAfterBreak = breakAfterClass.value > 0 && i === breakAfterClass.value + 1;
    intervals.push({ inicio: cursor, fim, isAfterBreak });
    cursor = fim;
    if (breakAfterClass.value > 0 && i === breakAfterClass.value && i < classCount.value) {
      cursor = addMinutes(cursor, breakDuration.value);
    }
  }

  return intervals;
});

const isValid = computed(() =>
  classCount.value >= 1
  && classDuration.value >= 1
  && startTime.value
  && (breakAfterClass.value === 0 || breakAfterClass.value < classCount.value),
);

function handleConfirm() {
  if (!isValid.value) return;
  emit('confirm', {
    startTime: startTime.value,
    classCount: classCount.value,
    classDuration: classDuration.value,
    breakDuration: breakDuration.value,
    breakAfterClass: breakAfterClass.value,
  });
}
</script>

<template>
  <ModalBaseLayout
    title="Adicionar horários em massa"
    :close-button="true"
    :on-close="() => emit('close')"
    class="!sm:max-w-[32rem]"
  >
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-ldsa-text-default">Horário inicial</label>
          <input
            v-model="startTime"
            type="time"
            class="border border-ldsa-grey rounded-md px-2 py-1.5 text-sm"
          >
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-ldsa-text-default">Quantidade de aulas</label>
          <input
            v-model.number="classCount"
            type="number"
            min="1"
            class="border border-ldsa-grey rounded-md px-2 py-1.5 text-sm"
          >
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-ldsa-text-default">Duração da aula (min)</label>
          <input
            v-model.number="classDuration"
            type="number"
            min="1"
            class="border border-ldsa-grey rounded-md px-2 py-1.5 text-sm"
          >
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-ldsa-text-default">Duração do intervalo (min)</label>
          <input
            v-model.number="breakDuration"
            type="number"
            min="0"
            class="border border-ldsa-grey rounded-md px-2 py-1.5 text-sm"
          >
        </div>

        <div class="col-span-2 flex flex-col gap-1">
          <label class="text-xs font-medium text-ldsa-text-default">
            Intervalo após aula nº
            <span class="text-ldsa-grey font-normal">(0 = sem intervalo)</span>
          </label>
          <input
            v-model.number="breakAfterClass"
            type="number"
            min="0"
            :max="Math.max(classCount - 1, 0)"
            class="border border-ldsa-grey rounded-md px-2 py-1.5 text-sm"
          >
        </div>
      </div>

      <!-- Preview -->
      <div v-if="preview.length > 0" class="border border-ldsa-grey/30 rounded-md p-3">
        <p class="text-xs font-medium text-ldsa-grey mb-2">Prévia dos horários:</p>
        <div class="flex flex-col gap-1">
          <div
            v-for="(item, i) in preview"
            :key="i"
            class="text-sm text-ldsa-text-default"
          >
            <div
              v-if="item.isAfterBreak"
              class="text-xs text-ldsa-grey italic mb-0.5"
            >
              — intervalo de {{ breakDuration }} min —
            </div>
            <span class="font-medium">Aula {{ i + 1 }}:</span>
            {{ item.inicio }} - {{ item.fim }}
          </div>
        </div>
      </div>
    </div>

    <template #button-group>
      <UIButtonModalCancel
        type="close"
        class="flex flex-1"
        @click="emit('close')"
      />
      <UIButtonModalCommonButtonsGreenWithCheck
        text="Adicionar"
        class="flex-1"
        :disabled="!isValid"
        @click.prevent="handleConfirm"
      />
    </template>
  </ModalBaseLayout>
</template>
