<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import {
  nivelFormacaoFindAll,
  nivelFormacaoFindById,
} from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
  multiple?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
});
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['niveis-formacoes'],
  list: (data: any) => api.call(nivelFormacaoFindAll, { query: data }),
  getOne: (id: string) => api.call(nivelFormacaoFindById, { path: { id } }),
};

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: item => ({
    value: item.id,
    label: item.slug,
  }),
});
</script>

<template>
  <VVAutocompleteAPIMultiple
    v-if="multiple"
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Níveis de Formação"
    placeholder="Selecione os níveis de formação"
    v-bind="$attrs"
  />

  <VVAutocompleteAPI
    v-else
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Nível de Formação"
    placeholder="Selecione um nível de formação"
    v-bind="$attrs"
  />
</template>
