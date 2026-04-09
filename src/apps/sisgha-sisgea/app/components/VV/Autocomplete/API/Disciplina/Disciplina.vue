<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { disciplinaFindAll, disciplinaFindById } from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['disciplinas'],
  listFn: disciplinaFindAll,
  getOneFn: disciplinaFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Disciplina"
    placeholder="Selecione uma disciplina"
    v-bind="$attrs"
  />
</template>
