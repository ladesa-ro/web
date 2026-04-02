<script setup lang="ts">
import type { BulkAddParams, GradeHorariaEditorGrade, GradeValidationErrors } from '~/composables/useGradeHorariaEditor';
import type { PeriodoGroup } from '~/utils/horarios';
import {
  agruparPorPeriodo,
  toDisplayFormat,
} from '~/utils/horarios';

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

// Agrupa intervalos por turno para exibição
const periodos = computed<PeriodoGroup[]>(() => {
  const formatted = props.grade.intervalos.map((i, originalIndex) => ({
    inicio: toDisplayFormat(i.inicio),
    fim: toDisplayFormat(i.fim),
    _originalIndex: originalIndex,
  }));

  const grupos = agruparPorPeriodo(formatted.map(f => ({ inicio: f.inicio, fim: f.fim })));

  let cursor = 0;
  const sorted = [...formatted].sort((a, b) => a.inicio.localeCompare(b.inicio));

  return grupos.map(g => ({
    ...g,
    intervalos: g.intervalos.map(intervalo => {
      const match = sorted.find(
        s => s.inicio === intervalo.inicio && s.fim === intervalo.fim && s._originalIndex >= 0,
      );
      const originalIndex = match?._originalIndex ?? cursor;
      if (match) match._originalIndex = -1;
      cursor++;
      return { ...intervalo, _originalIndex: originalIndex };
    }),
  }));
});

function getOriginalIndex(periodo: (typeof periodos.value)[number], intervaloIdx: number): number {
  const item = periodo.intervalos[intervaloIdx] as { _originalIndex?: number } | undefined;
  return item?._originalIndex ?? 0;
}

function getIntervalError(periodo: (typeof periodos.value)[number], intervaloIdx: number): string | undefined {
  if (!props.errors) return undefined;
  const originalIdx = getOriginalIndex(periodo, intervaloIdx);
  return props.errors.intervalos[originalIdx];
}
</script>

<template>
  <UICollapsible
    v-model="open"
    class="border-2 rounded-lg"
    :class="open ? 'border-ldsa-green-2' : 'border-ldsa-grey'"
  >
    <template #trigger>
      <div class="p-3 sm:p-4 flex justify-between items-center bg-ldsa-green-1 text-white rounded-t-md">
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <template v-if="isEditing">
            <input
              :value="props.grade.nome"
              :disabled="disabled"
              placeholder="Nome da grade horária"
              class="border rounded-md px-2 py-1 text-sm font-semibold flex-1 min-w-0 text-white placeholder-white/60 disabled:opacity-40"
              :class="errors?.nome ? 'border-ldsa-red bg-red-500/20' : 'border-white/30 bg-white/20'"
              @input="emit('update:nome', ($event.target as HTMLInputElement).value)"
              @click.stop
            >
            <button
              :disabled="disabled"
              class="text-white/80 hover:text-white text-sm px-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Remover grade horária"
              @click.stop="emit('remove-grade')"
            >
              <IconsExclude class="w-4 h-4" />
            </button>
          </template>
          <template v-else>
            <span class="font-semibold text-white truncate">
              {{ props.grade.nome || 'Grade sem nome' }}
            </span>
          </template>
        </div>
        <IconsArrow
          class="transition-[rotate] duration-200 shrink-0 ml-2"
          :class="[
            open ? 'rotate-90' : '-rotate-90',
            'text-white',
          ]"
        />
      </div>
    </template>

    <!-- Erro no nome (abaixo do header) -->
    <p
      v-if="errors?.nome && isEditing"
      class="text-ldsa-red text-xs px-4 pt-2"
    >
      {{ errors.nome }}
    </p>

    <!-- Botão limpar todos -->
    <div v-if="isEditing" class="flex justify-end px-4 pt-3">
      <UIButtonModalClearDanger
        text="Limpar todos os horários"
        :disabled="disabled || props.grade.intervalos.length === 0"
        @click="emit('clear-all-intervals')"
      />
    </div>

    <!-- Conteúdo dividido por turnos (Matutino / Vespertino / Noturno) -->
    <div class="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-ldsa-grey py-4 md:py-6">
      <div
        v-for="periodo in periodos"
        :key="periodo.nome"
        class="px-4"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-semibold text-[16px] border-l-4 border-ldsa-green-1 pl-2">
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
          class="mb-2"
        >
          <div
            class="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 p-3 border-b-2"
            :class="getIntervalError(periodo, j) ? 'border-ldsa-red/30' : 'border-ldsa-grey/20'"
          >
            <template v-if="isEditing">
              <UIFormTimeRangeField
                :start="toDisplayFormat(props.grade.intervalos[getOriginalIndex(periodo, j)]?.inicio ?? '')"
                :end="toDisplayFormat(props.grade.intervalos[getOriginalIndex(periodo, j)]?.fim ?? '')"
                :disabled="disabled"
                :error="getIntervalError(periodo, j)"
                class="flex-1"
                @update:start="emit('update:intervalo-inicio', getOriginalIndex(periodo, j), $event ?? '')"
                @update:end="emit('update:intervalo-fim', getOriginalIndex(periodo, j), $event ?? '')"
              />
              <button
                :disabled="disabled"
                class="w-[0.9rem] hover:text-ldsa-red disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                @click="emit('remove-interval', getOriginalIndex(periodo, j))"
              >
                <IconsExclude />
              </button>
            </template>
            <template v-else>
              <div class="font-medium text-[13px] whitespace-nowrap">
                {{ intervalo.inicio }} - {{ intervalo.fim }}
              </div>
            </template>
          </div>

          <!-- Erro inline do intervalo -->
          <p
            v-if="getIntervalError(periodo, j) && isEditing"
            class="text-ldsa-red text-xs mt-1 pl-3"
          >
            {{ getIntervalError(periodo, j) }}
          </p>
        </div>

        <p
          v-if="periodo.intervalos.length === 0 && !isEditing"
          class="text-ldsa-grey text-sm text-center mt-4"
        >
          Nenhum intervalo
        </p>

        <div v-if="isEditing" class="flex items-center justify-center gap-2 mt-4">
          <SectionGradeHorariaButtonAddHorario
            :disabled="disabled"
            class="flex-1"
            @click="emit('add-interval', periodo.nome)"
          />
          <div class="w-px h-5 bg-ldsa-grey/40 shrink-0" />
          <SectionGradeHorariaButtonAddEmMassa
            :disabled="disabled"
            class="flex-1"
            @click="openBulkModal(periodo.nome)"
          />
        </div>
      </div>
    </div>

    <!-- Erro de sobreposição geral da grade -->
    <p
      v-if="errors?.overlap && isEditing"
      class="text-ldsa-red text-xs px-4 pb-3"
    >
      {{ errors.overlap }}
    </p>

    <!-- Modal de adição em massa -->
    <DialogSkeleton v-model="showBulkModal">
      <SectionGradeHorariaBulkAddModal
        :default-periodo="bulkModalPeriodo"
        @confirm="handleBulkConfirm"
        @close="showBulkModal = false"
      />
    </DialogSkeleton>
  </UICollapsible>
</template>
