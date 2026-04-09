<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { cursoFindAll, cursoFindById } from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['cursos'],
  listFn: cursoFindAll,
  getOneFn: cursoFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
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
