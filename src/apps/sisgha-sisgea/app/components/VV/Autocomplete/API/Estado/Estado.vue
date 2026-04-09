<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { estadoFindAll, estadoFindById } from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['estados'],
  listFn: estadoFindAll,
  getOneFn: estadoFindById,
  transformer: (item: any) => ({
    value: item.id,
    label: `${item.nome} (${item.sigla})`,
  }),
  getOneAdapter: (api, id) =>
    api.call(estadoFindById, { path: { id: Number(id) } }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Estado"
    placeholder="Selecione um estado"
    v-bind="$attrs"
  />
</template>
