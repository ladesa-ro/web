<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { turmaFindAll, turmaFindById } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  filterCursoId?: string | null;
  campusId?: string;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: computed(() => [
    'turmas',
    'byCurso',
    props.filterCursoId ?? 'all',
    props.campusId ?? '',
  ]),
  listFn: turmaFindAll,
  getOneFn: turmaFindById,
  transformer: (item: any) => ({
    value: item.id,
    label: item.nome ?? item.periodo,
  }),
  listAdapter: (api, data) =>
    api.call(turmaFindAll, {
      query: {
        ...data,
        'filter.curso.id': props.filterCursoId
          ? [props.filterCursoId]
          : undefined,
        ...(props.campusId ? { 'filter.curso.campus.id': [props.campusId] } : {}),
      },
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
