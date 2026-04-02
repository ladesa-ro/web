<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { cidadeFindAll, cidadeFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
  filterEstadoId?: number | null;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['cidades'],
  list: (data: any) => {
    const query = { ...data };
    if (props.filterEstadoId) {
      query['filter.estado.id'] = [String(props.filterEstadoId)];
    }
    return api.call(cidadeFindAll, { query });
  },
  getOne: (id: string) => api.call(cidadeFindById, { path: { id: Number(id) } }),
};

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: (item: any) => ({
    value: item.id,
    label: `${item.nome} - ${item.estado.sigla}`,
  }),
});

//
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
