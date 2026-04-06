<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { turmaFindAll, turmaFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
  filterCursoId?: string | null;
};

const props = defineProps<Props>();

const api = useApiClient();

const crudModule = {
  baseQueryKeys: computed(() => ['turmas', 'byCurso', props.filterCursoId ?? 'all']),
  list: (data: any) =>
    api.call(turmaFindAll, {
      query: {
        ...data,
        'filter.curso.id': props.filterCursoId ? [props.filterCursoId] : undefined,
      },
    }),
  getOne: (id: string) => api.call(turmaFindById, { path: { id } }),
};

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,
  transformer: (item: any) => ({
    value: item.id,
    label: item.nome ?? item.periodo,
  }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Turma"
    placeholder="Selecione uma turma"
    v-bind="$attrs"
  />
</template>
