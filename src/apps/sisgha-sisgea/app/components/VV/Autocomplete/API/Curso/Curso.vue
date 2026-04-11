<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { cursoFindAll, cursoFindById } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  campusId?: string;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: computed(() => ['cursos', props.campusId ?? '']),
  listFn: cursoFindAll,
  getOneFn: cursoFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
  listAdapter: (api, data) =>
    api.call(cursoFindAll, {
      query: {
        ...data,
        ...(props.campusId ? { 'filter.campus.id': [props.campusId] } : {}),
      },
    }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Curso"
    placeholder="Selecione um curso"
    v-bind="$attrs"
  />
</template>
