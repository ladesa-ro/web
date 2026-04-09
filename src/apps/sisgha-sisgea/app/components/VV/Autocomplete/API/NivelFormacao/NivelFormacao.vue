<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { nivelFormacaoFindAll, nivelFormacaoFindById } from '@ladesa-ro/web.api.client';

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
    name: string;
    multiple?: boolean;
    getValue?: (item: any) => string | number;
    buildItem?: (value: string | number) => any;
  }>(),
  {
    multiple: false,
    getValue: (item: any) => item?.id ?? item,
    buildItem: (value: string | number) => ({ id: String(value) }),
  },
);

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['niveis-formacoes'],
  listFn: nivelFormacaoFindAll,
  getOneFn: nivelFormacaoFindById,
  transformer: item => ({ value: item.id, label: item.slug }),
});
</script>

<template>
  <VVAutocompleteAPIMultiple
    v-if="multiple"
    :is-loading="isLoading"
    :name="name"
    :options="options"
    :get-value="getValue"
    :build-item="buildItem"
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
