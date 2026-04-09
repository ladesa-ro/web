<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { cidadeFindAll, cidadeFindById } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  filterEstadoId?: number | null;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['cidades'],
  listFn: cidadeFindAll,
  getOneFn: cidadeFindById,
  transformer: (item: any) => ({
    value: item.id,
    label: `${item.nome} - ${item.estado.sigla}`,
  }),
  listAdapter: (api, data) => {
    const query = { ...data };
    if (props.filterEstadoId) {
      query['filter.estado.id'] = [String(props.filterEstadoId)];
    }
    return api.call(cidadeFindAll, { query });
  },
  getOneAdapter: (api, id) =>
    api.call(cidadeFindById, { path: { id: Number(id) } }),
});
</script>

<template>
  <VVAutocompleteAPI
    :key="filterEstadoId ?? 'all'"
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Cidade"
    placeholder="Selecione uma cidade"
    v-bind="$attrs"
  />
</template>
