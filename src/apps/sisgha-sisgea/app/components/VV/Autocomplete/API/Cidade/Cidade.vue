<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { cidadeFindAll, cidadeFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['cidades'],
  list: (data: any) => api.call(cidadeFindAll, { query: data }),
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
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Cidade"
    placeholder="Selecione uma cidade"
    v-bind="$attrs"
  />
</template>
