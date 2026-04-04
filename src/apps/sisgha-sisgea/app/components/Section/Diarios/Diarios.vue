<script lang="ts" setup>
import { diarioFindAll, diarioFindById } from '@ladesa-ro/web.api.client';
import type { ParsedItem } from '~/composables/useOptionItems';
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['diarios'] as string[],
  list: (data?: any) => api.call(diarioFindAll, { query: data }),
  getOne: (id: string) => api.call(diarioFindById, { path: { id } }),
} satisfies IEntityListModule;

// Filtros
const ofertaFormacoes = useOfertasFormacoes();
const cursos = useCursos();
const turmasComposable = useTurmas();
const disciplinasComposable = useDisciplinas();

const selectedOfertaFormacao = ref<ParsedItem | undefined>(undefined);
const selectedCurso = ref<ParsedItem | undefined>(undefined);
const selectedTurma = ref<ParsedItem | undefined>(undefined);
const selectedDisciplina = ref<ParsedItem | undefined>(undefined);

const ofertaFormacaoListQuery = ofertaFormacoes.list();
const cursoListQuery = cursos.list(
  computed(() => {
    if (!selectedOfertaFormacao.value) return {};
    return { 'filter.ofertaFormacao.id': [selectedOfertaFormacao.value.value] };
  })
);
const turmaListQuery = turmasComposable.list(
  computed(() => {
    if (!selectedCurso.value) return {};
    return { 'filter.curso.id': [selectedCurso.value.value] };
  })
);
const disciplinaListQuery = disciplinasComposable.list();

const ofertaFormacaoItems = computed(
  () =>
    ofertaFormacaoListQuery.data.value?.data?.map(
      (o: Record<string, unknown>) => ({
        value: o.id as string,
        label: (o.nome as string) ?? '',
      })
    ) ?? []
);

const cursoItems = computed(
  () =>
    cursoListQuery.data.value?.data?.map(
      (c: Record<string, unknown>) => ({
        value: c.id as string,
        label: (c.nome as string) ?? '',
      })
    ) ?? []
);

const turmaItems = computed(
  () =>
    turmaListQuery.data.value?.data?.map(
      (t: Record<string, unknown>) => ({
        value: t.id as string,
        label: (t.periodo as string) ?? '',
      })
    ) ?? []
);

const disciplinaItems = computed(
  () =>
    disciplinaListQuery.data.value?.data?.map(
      (d: Record<string, unknown>) => ({
        value: d.id as string,
        label: (d.nome as string) ?? '',
      })
    ) ?? []
);

// Cascata: limpar filtros dependentes
watch(selectedOfertaFormacao, () => {
  selectedCurso.value = undefined;
  selectedTurma.value = undefined;
});

watch(selectedCurso, () => {
  selectedTurma.value = undefined;
});

// Filtro reativo para a listagem
const filter = computed(() => {
  const f: Record<string, unknown> = {};
  if (selectedTurma.value) {
    f['filter.turma.id'] = [selectedTurma.value.value];
  }
  if (selectedDisciplina.value) {
    f['filter.disciplina.id'] = [selectedDisciplina.value.value];
  }
  return f;
});

const options = createApiListContextOptions({ crudModule, filter });
</script>

<template>
  <UIAPIList :options="options">
    <template #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <LazySectionDiariosModal />
    </template>

    <template #filters>
      <div class="flex flex-wrap gap-3 items-end">
        <div class="min-w-56 flex-1">
          <UIFormOptionFieldsSelect
            v-model="selectedOfertaFormacao"
            label="Formação"
            placeholder="Todas"
            :items="ofertaFormacaoItems"
          />
        </div>
        <div class="min-w-56 flex-1">
          <UIFormOptionFieldsSelect
            v-model="selectedCurso"
            label="Curso"
            placeholder="Todos"
            :items="cursoItems"
          />
        </div>
        <div class="min-w-56 flex-1">
          <UIFormOptionFieldsSelect
            v-model="selectedTurma"
            label="Turma"
            placeholder="Todas"
            :items="turmaItems"
          />
        </div>
        <div class="min-w-56 flex-1">
          <UIFormOptionFieldsSelect
            v-model="selectedDisciplina"
            label="Disciplina"
            placeholder="Todas"
            :items="disciplinaItems"
          />
        </div>
      </div>
    </template>

    <template #grid-item="{ item }">
      <SectionDiariosGridItem :diario="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionDiariosGridItem :diario="null" />
    </template>
  </UIAPIList>
</template>
