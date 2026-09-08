<script setup lang="ts">
import type {
  BulkAddParams,
  GradeHorariaEditorGrade,
  GradeValidationErrors,
} from '~/composables/useGradeHorariaEditor';
import type { PeriodoGroup } from '~/utils/horarios';
import { agruparPorPeriodo, toDisplayFormat } from '~/utils/horarios';

const props = defineProps<{
  grade: GradeHorariaEditorGrade;
  gradeIndex: number;
  isEditing: boolean;
  disabled?: boolean;
  errors?: GradeValidationErrors;
}>();

const emit = defineEmits<{
  'update:nome': [value: string];
  'update:intervalo-inicio': [intervalIndex: number, value: string];
  'update:intervalo-fim': [intervalIndex: number, value: string];
  'add-interval': [periodo: string];
  'remove-interval': [intervalIndex: number];
  'remove-intervals-by-periodo': [periodo: string];
  'clear-all-intervals': [];
  'add-intervals-bulk': [params: BulkAddParams];
  'remove-grade': [];
}>();

const open = ref(true);
const showBulkModal = ref(false);
const bulkModalPeriodo = ref<import('~/utils/horarios').Periodo>('Matutino');

function openBulkModal(periodo: string) {
  bulkModalPeriodo.value = periodo as import('~/utils/horarios').Periodo;
  showBulkModal.value = true;
}

function handleBulkConfirm(params: BulkAddParams) {
  emit('add-intervals-bulk', params);
  showBulkModal.value = false;
}

const periodos = computed<PeriodoGroup[]>(() => {
  const formatted = props.grade.intervalos.map((i, originalIndex) => ({
    inicio: toDisplayFormat(i.inicio),
    fim: toDisplayFormat(i.fim),
    _originalIndex: originalIndex,
  }));

  const grupos = agruparPorPeriodo(
    formatted.map(f => ({ inicio: f.inicio, fim: f.fim }))
  );

  let cursor = 0;
  const sorted = [...formatted].sort((a, b) =>
    a.inicio.localeCompare(b.inicio)
  );

  return grupos.map(g => ({
    ...g,
    intervalos: g.intervalos.map(intervalo => {
      const match = sorted.find(
        s =>
          s.inicio === intervalo.inicio &&
          s.fim === intervalo.fim &&
          s._originalIndex >= 0
      );
      const originalIndex = match?._originalIndex ?? cursor;
      if (match) match._originalIndex = -1;
      cursor++;
      return { ...intervalo, _originalIndex: originalIndex };
    }),
  }));
});

function getOriginalIndex(
  periodo: (typeof periodos.value)[number],
  intervaloIdx: number
): number {
  const item = periodo.intervalos[intervaloIdx] as
    | { _originalIndex?: number }
    | undefined;
  return item?._originalIndex ?? 0;
}

function getIntervalError(
  periodo: (typeof periodos.value)[number],
  intervaloIdx: number
): string | undefined {
  if (!props.errors) return undefined;
  const originalIdx = getOriginalIndex(periodo, intervaloIdx);
  return props.errors.intervalos[originalIdx];
}
</script>

<template>
  <UICollapsible
    v-model="open"
    class="u-rounded-lg grade-accordion"
    :class="open ? 'grade-accordion--open' : 'grade-accordion--closed'"
  >
    <template #trigger>
      <div
        class="u-flex u-justify-between u-items-center grade-accordion__header"
      >
        <SectionGradeHorariaTitleField
          :nome="props.grade.nome"
          :is-editing="isEditing"
          :disabled="disabled"
          :has-error="!!errors?.nome"
          @update:nome="emit('update:nome', $event)"
          @remove-grade="emit('remove-grade')"
        />
        <IconsArrow
          class="u-shrink-0 u-ml-2 grade-accordion__arrow"
          :class="
            open
              ? 'grade-accordion__arrow--open'
              : 'grade-accordion__arrow--closed'
          "
        />
      </div>
    </template>

    <p
      v-if="errors?.nome && isEditing"
      class="u-text-xs u-px-4 u-pt-2 grade-accordion__error-text"
    >
      {{ errors.nome }}
    </p>

    <div v-if="isEditing" class="u-flex u-justify-end u-px-4 u-pt-3">
      <UIButtonModalClearDanger
        text="Limpar todos os horários"
        :disabled="disabled || props.grade.intervalos.length === 0"
        @click="emit('clear-all-intervals')"
      />
    </div>

    <div class="u-grid grade-accordion__periods">
      <div v-for="periodo in periodos" :key="periodo.nome" class="u-px-4">
        <div class="u-flex u-justify-between u-items-center u-mb-3">
          <h2 class="u-font-semibold grade-accordion__period-title">
            {{ periodo.nome }}
          </h2>
          <UIButtonModalClearDanger
            v-if="isEditing"
            text="Limpar turno"
            :disabled="disabled || periodo.intervalos.length === 0"
            @click="emit('remove-intervals-by-periodo', periodo.nome)"
          />
        </div>

        <div
          v-for="(intervalo, j) in periodo.intervalos"
          :key="j"
          class="u-mb-2"
        >
          <SectionGradeHorariaIntervalRow
            :start="
              toDisplayFormat(
                props.grade.intervalos[getOriginalIndex(periodo, j)]?.inicio ??
                  ''
              )
            "
            :end="
              toDisplayFormat(
                props.grade.intervalos[getOriginalIndex(periodo, j)]?.fim ?? ''
              )
            "
            :inicio="intervalo.inicio"
            :fim="intervalo.fim"
            :is-editing="isEditing"
            :disabled="disabled"
            :error="getIntervalError(periodo, j)"
            @update:start="
              emit(
                'update:intervalo-inicio',
                getOriginalIndex(periodo, j),
                $event
              )
            "
            @update:end="
              emit('update:intervalo-fim', getOriginalIndex(periodo, j), $event)
            "
            @remove="emit('remove-interval', getOriginalIndex(periodo, j))"
          />

          <p
            v-if="getIntervalError(periodo, j) && isEditing"
            class="u-text-xs u-mt-1 u-pl-3 grade-accordion__error-text"
          >
            {{ getIntervalError(periodo, j) }}
          </p>
        </div>

        <p
          v-if="periodo.intervalos.length === 0 && !isEditing"
          class="u-text-sm u-text-center u-mt-4 grade-accordion__empty-text"
        >
          Nenhum intervalo
        </p>

        <div
          v-if="isEditing"
          class="u-flex u-items-center u-justify-center u-gap-2 u-mt-4"
        >
          <SectionGradeHorariaButtonAdd
            label="Adicionar horário de aula"
            :disabled="disabled"
            class="u-flex-1"
            @click="emit('add-interval', periodo.nome)"
          />
          <div class="u-shrink-0 grade-accordion__divider" />
          <SectionGradeHorariaButtonAdd
            label="Adicionar em massa"
            :disabled="disabled"
            class="u-flex-1"
            @click="openBulkModal(periodo.nome)"
          />
        </div>
      </div>
    </div>

    <p
      v-if="errors?.overlap && isEditing"
      class="u-text-xs u-px-4 u-pb-3 grade-accordion__error-text"
    >
      {{ errors.overlap }}
    </p>

    <DialogSkeleton v-model="showBulkModal">
      <SectionGradeHorariaBulkAddModal
        :default-periodo="bulkModalPeriodo"
        @confirm="handleBulkConfirm"
        @close="showBulkModal = false"
      />
    </DialogSkeleton>
  </UICollapsible>
</template>

<style scoped>
.grade-accordion {
  border-width: 2px;
  border-style: solid;
}

.grade-accordion--open {
  border-color: var(--ladesa-green-2-color);
}

.grade-accordion--closed {
  border-color: var(--ladesa-grey-color);
}

.grade-accordion__header {
  padding: var(--ui-space-3);
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  border-top-left-radius: var(--ui-radius-md);
  border-top-right-radius: var(--ui-radius-md);
}

@media (min-width: 640px) {
  .grade-accordion__header {
    padding: var(--ui-space-4);
  }
}

.grade-accordion__arrow {
  color: var(--ladesa-white-color);
  transition: rotate var(--ui-duration-base) linear;
}

.grade-accordion__arrow--open {
  rotate: 90deg;
}

.grade-accordion__arrow--closed {
  rotate: -90deg;
}

.grade-accordion__error-text {
  color: var(--ladesa-red-color);
}

.grade-accordion__periods {
  grid-template-columns: 1fr;
  padding-block: var(--ui-space-4);
}

@media (min-width: 768px) {
  .grade-accordion__periods {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding-block: var(--ui-space-6);
  }

  .grade-accordion__periods > * + * {
    border-left: 1px solid var(--ladesa-grey-color);
  }
}

.grade-accordion__period-title {
  font-size: 1rem;
  border-left: 4px solid var(--ladesa-green-1-color);
  padding-left: var(--ui-space-2);
}

.grade-accordion__empty-text {
  color: var(--ladesa-grey-color);
}

.grade-accordion__divider {
  width: 1px;
  height: 1.25rem;
  background-color: rgb(from var(--ladesa-grey-color) R G B / 40%);
}
</style>
