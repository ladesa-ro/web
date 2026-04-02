<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { estadoFindAll, estadoFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['estados'],
  list: (data: any) => api.call(estadoFindAll, { query: data }),
  getOne: (id: string) => api.call(estadoFindById, { path: { id: Number(id) } }),
};

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: (item: any) => ({
    value: item.id,
    label: `${item.nome} (${item.sigla})`,
  }),
});

//
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
