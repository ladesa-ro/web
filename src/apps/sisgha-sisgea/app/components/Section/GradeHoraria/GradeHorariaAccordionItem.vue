<script setup lang="ts">
import type { GradeHorariaEditorGrade } from '~/composables/useGradeHorariaEditor';
import type { PeriodoGroup } from '~/utils/horarios';
import {
  agruparPorPeriodo,
  toDisplayFormat,
} from '~/utils/horarios';

const props = defineProps<{
  grade: GradeHorariaEditorGrade;
  gradeIndex: number;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  'update:nome': [value: string];
  'update:intervalo-inicio': [intervalIndex: number, value: string];
  'update:intervalo-fim': [intervalIndex: number, value: string];
  'add-interval': [periodo: string];
  'remove-interval': [intervalIndex: number];
  'remove-grade': [];
}>();

const open = ref(true);

// Agrupa intervalos por turno para exibição
const periodos = computed<PeriodoGroup[]>(() => {
  const formatted = props.grade.intervalos.map((i, originalIndex) => ({
    inicio: toDisplayFormat(i.inicio),
    fim: toDisplayFormat(i.fim),
    _originalIndex: originalIndex,
  }));

  const grupos = agruparPorPeriodo(formatted.map(f => ({ inicio: f.inicio, fim: f.fim })));

  // Reconstroi com índices originais para mapear corretamente os emits
  let cursor = 0;
  const sorted = [...formatted].sort((a, b) => a.inicio.localeCompare(b.inicio));

  return grupos.map(g => ({
    ...g,
    intervalos: g.intervalos.map(intervalo => {
      const match = sorted.find(
        s => s.inicio === intervalo.inicio && s.fim === intervalo.fim && s._originalIndex >= 0,
      );
      const originalIndex = match?._originalIndex ?? cursor;
      if (match) match._originalIndex = -1; // marca como usado
      cursor++;
      return { ...intervalo, _originalIndex: originalIndex };
    }),
  }));
});

// Mapa flat de índice original por posição para modo edição
function getOriginalIndex(periodo: (typeof periodos.value)[number], intervaloIdx: number): number {
  const item = periodo.intervalos[intervaloIdx] as { _originalIndex?: number } | undefined;
  return item?._originalIndex ?? 0;
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
              placeholder="Nome da grade horária"
              class="border border-white/30 bg-white/20 rounded-md px-2 py-1 text-sm font-semibold flex-1 min-w-0 text-white placeholder-white/60"
              @input="emit('update:nome', ($event.target as HTMLInputElement).value)"
              @click.stop
            >
            <button
              class="text-white/80 hover:text-white text-sm px-2 shrink-0"
              title="Remover grade horária"
              @click.stop="emit('remove-grade')"
            >
              <IconsTrash class="w-4 h-4" />
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
        </div>

        <div
          v-for="(intervalo, j) in periodo.intervalos"
          :key="j"
          class="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 mb-2 p-3 border-b-2 border-ldsa-grey/20"
        >
          <template v-if="isEditing">
            <div class="flex items-center gap-2">
              <input
                type="time"
                :value="toDisplayFormat(props.grade.intervalos[getOriginalIndex(periodo, j)]?.inicio ?? '')"
                class="border border-ldsa-grey rounded-md px-2 py-1 text-sm w-28"
                @input="emit('update:intervalo-inicio', getOriginalIndex(periodo, j), ($event.target as HTMLInputElement).value)"
              >
              <span class="text-ldsa-text-default">-</span>
              <input
                type="time"
                :value="toDisplayFormat(props.grade.intervalos[getOriginalIndex(periodo, j)]?.fim ?? '')"
                class="border border-ldsa-grey rounded-md px-2 py-1 text-sm w-28"
                @input="emit('update:intervalo-fim', getOriginalIndex(periodo, j), ($event.target as HTMLInputElement).value)"
              >
            </div>
            <div class="flex gap-4 text-sm">
              <button
                class="w-[0.9rem] hover:text-ldsa-red"
                @click="emit('remove-interval', getOriginalIndex(periodo, j))"
              >
                <IconsExclude />
              </button>
            </div>
          </template>
          <template v-else>
            <div class="font-medium text-[13px] whitespace-nowrap">
              {{ intervalo.inicio }} - {{ intervalo.fim }}
            </div>
          </template>
        </div>

        <p
          v-if="periodo.intervalos.length === 0 && !isEditing"
          class="text-ldsa-grey text-sm text-center mt-4"
        >
          Nenhum intervalo
        </p>

        <button
          v-if="isEditing"
          class="mx-auto text-ldsa-grey font-semibold text-[14px] flex items-center gap-1 mt-4"
          @click="emit('add-interval', periodo.nome)"
        >
          Adicionar horário de aula
          <IconsAdd class="w-[0.7rem] mb-0.5" />
        </button>
      </div>
    </div>
  </UICollapsible>
</template>
