<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import { useField } from 'vee-validate';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

type Props = {
  name: string;
  isLoading?: boolean;
  options: IUIAutocompleteApiRetrieverOptions;
};

const {
  name,
  isLoading: propIsLoading,
  options: apiRetrieverOptions,
} = defineProps<Props>();

const { value } = useField<Array<string | number>>(name);

const searchValue = defineModel('search', { default: '' });

const searchOptions = computed(() => {
  return { search: unref(searchValue) || '' };
});

const crudModule = apiRetrieverOptions.crudModule;

const listQuery = useQuery({
  queryKey: computed(() => [
    ...crudModule.baseQueryKeys,
    'list',
    JSON.stringify(unref(searchOptions)),
  ]),
  queryFn: () => crudModule.list(unref(searchOptions)),
});

const listItems = computed(() => listQuery.data.value?.data ?? []);
const listIsLoading = listQuery.isLoading;

const selectItems = computed(() => {
  const listItemsValue = unref(listItems) ?? [];
  const combined = filter(listItemsValue, Boolean);
  const transformed = combined.map(apiRetrieverOptions.transformer);
  return uniqBy(transformed, 'value');
});

const isLoading = computed(() => unref(propIsLoading) || unref(listIsLoading));
</script>

<template>
  <UIFormOptionFieldsAutocompleteMultiple
    v-if="isLoading && selectItems.length === 0"
    v-model:search-term="searchValue"
    v-bind="$attrs"
    placeholder="Carregando..."
    :items="[]"
    :selected-options="[]"
  />

  <UIFormOptionFieldsAutocompleteMultiple
    v-else-if="selectItems.length === 0"
    v-model:search-term="searchValue"
    v-bind="$attrs"
    placeholder="Carregando..."
    :items="[]"
    :selected-options="[]"
  />

  <VVAutocompleteMultiple
    v-else
    v-model:search="searchValue"
    :items="selectItems"
    :name="name"
    v-bind="$attrs"
  />
</template>
