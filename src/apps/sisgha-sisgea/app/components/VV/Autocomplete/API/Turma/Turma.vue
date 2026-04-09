<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { turmaFindAll, turmaFindById } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  filterCursoId?: string | null;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: computed(() => [
    'turmas',
    'byCurso',
    props.filterCursoId ?? 'all',
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
