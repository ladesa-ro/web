<script generic="Typings extends IGenericCrudModuleTypesBase" lang="ts" setup>
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import { useField } from 'vee-validate';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

type Props = {
  name: string;
  isLoading?: boolean;
  options: IUIAutocompleteApiRetrieverOptions<Typings>;
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

const { useListQuery } = useGenericCrudComposables(
  apiRetrieverOptions.crudModule
);

const {
  queryStatus: { isLoading: listIsLoading },
  data: { items: listItems },
} = useListQuery(searchOptions);

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
