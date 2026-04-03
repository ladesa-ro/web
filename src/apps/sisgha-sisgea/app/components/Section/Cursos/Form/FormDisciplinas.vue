<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import type { InfiniteData } from '@tanstack/vue-query';
import type { DisciplinaFindAllResponse } from '@ladesa-ro/web.api.client';

const periodos = useInjectCursoPeriodos();

// Cache de nomes/cargaHoraria derivado da query compartilhada
const disciplinasCache = computed(() => {
  const data = periodos.disciplinasInfiniteQuery.data.value as
    | InfiniteData<DisciplinaFindAllResponse>
    | undefined;
  if (!data?.pages) return new Map<string, { nome: string; cargaHoraria: number }>();

  const cache = new Map<string, { nome: string; cargaHoraria: number }>();
  for (const page of data.pages) {
    for (const d of page.data ?? []) {
      cache.set(d.id, { nome: d.nome, cargaHoraria: d.cargaHoraria });
    }
  }
  return cache;
});

const periodosVisiveis = computed(() => {
  const items = periodos.localPeriodos.value;
  const saved = periodos.savedPeriodos.value;

  return items.map(periodo => {
    const currentIds = new Set(periodo.disciplinas.map(d => d.disciplinaId));
    const savedIds = saved.get(periodo.numeroPeriodo) ?? new Set<string>();

    const removedIds = [...savedIds].filter(id => !currentIds.has(id));

    return {
      numeroPeriodo: periodo.numeroPeriodo,
      disciplinas: periodo.disciplinas,
      removedDisciplinaIds: removedIds,
    };
  });
});

function isNew(numeroPeriodo: number, disciplinaId: string): boolean {
  const saved = periodos.savedPeriodos.value.get(numeroPeriodo) ?? new Set<string>();
  return saved.size > 0 && !saved.has(disciplinaId);
}
</script>

<template>
  <DialogModalBaseLayout
    :on-close="() => {}"
    :close-button="false"
    title="Disciplinas de cada período"
  >
    <div
      v-if="periodosVisiveis.length === 0"
      class="text-ldsa-grey text-sm text-center py-8"
    >
      Defina a quantidade de períodos no formulário ao lado.
    </div>

    <div
      v-for="periodo in periodosVisiveis"
      :key="periodo.numeroPeriodo"
      class="flex flex-col"
    >
      <div class="flex items-center gap-2.5">
        <h1 class="font-medium">Período {{ periodo.numeroPeriodo }}</h1>
        <div class="h-[2.5px] flex-1 bg-ldsa-grey" />
        <button
          type="button"
          class="shrink-0 flex items-center justify-center size-7 rounded-md bg-ldsa-green-1 text-white hover:bg-ldsa-green-2 transition-colors"
          @click="periodos.openSelectDisciplinas(periodo.numeroPeriodo - 1)"
        >
          <IconsEdit class="w-3" />
        </button>
      </div>

      <div
        v-if="periodo.disciplinas.length === 0 && periodo.removedDisciplinaIds.length === 0"
        class="py-3 px-1"
      >
        <span class="text-ldsa-grey text-sm">
          Nenhuma disciplina vinculada
        </span>
      </div>

      <!-- Disciplinas ativas -->
      <div
        v-for="disc in periodo.disciplinas"
        :key="disc.disciplinaId"
        class="flex items-center justify-between border-b border-ldsa-grey px-1 py-3.5 overflow-clip"
      >
        <span class="text-ldsa-text-default text-sm font-medium">
          {{ disciplinasCache.get(disc.disciplinaId)?.nome ?? '...' }}
          <span
            v-if="isNew(periodo.numeroPeriodo, disc.disciplinaId)"
            class="text-ldsa-green-1 text-xs font-semibold ml-1"
          >
            Nova
          </span>
        </span>
        <span class="text-ldsa-grey text-xs font-medium">
          Carga Horária:
          {{
            disc.cargaHoraria ??
            disciplinasCache.get(disc.disciplinaId)?.cargaHoraria ??
            '—'
          }}h
        </span>
      </div>

      <!-- Disciplinas removidas (só no modo edição) -->
      <div
        v-for="removedId in periodo.removedDisciplinaIds"
        :key="removedId"
        class="flex items-center justify-between border-b border-ldsa-grey/50 px-1 py-3.5 overflow-clip opacity-50"
      >
        <span class="text-ldsa-text-default text-sm font-medium line-through">
          {{ disciplinasCache.get(removedId)?.nome ?? '...' }}
          <span class="text-ldsa-red text-xs font-semibold ml-1 no-underline inline-block">
            Removida
          </span>
        </span>
        <span class="text-ldsa-grey text-xs font-medium line-through">
          Carga Horária:
          {{ disciplinasCache.get(removedId)?.cargaHoraria ?? '—' }}h
        </span>
      </div>
    </div>
  </DialogModalBaseLayout>
</template>
