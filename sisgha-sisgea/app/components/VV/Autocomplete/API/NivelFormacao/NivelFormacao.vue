<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

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

const apiClient = useApiClient();
const crudModule = {
  baseQueryKeys: ['niveis-formacoes'],
  list: (data: any) => apiClient.niveisFormacoes.nivelFormacaoFindAll(data),
  getOne: (id: string) => apiClient.niveisFormacoes.nivelFormacaoFindById({ id }),
} as any;

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
