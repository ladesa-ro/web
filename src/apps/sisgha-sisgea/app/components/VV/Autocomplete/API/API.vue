<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { filter, uniqBy } from 'lodash-es';
import { useField } from 'vee-validate';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

type Props = {
  name: string;
  isLoading?: boolean;
  required?: boolean;
  options: IUIAutocompleteApiRetrieverOptions;
};

const {
  name,
  isLoading: propIsLoading,
  options: apiRetrieverOptions,
  required,
} = defineProps<Props>();

const { value } = useField(name, inputValue => {
  if (!required) {
    return true;
  }

  if (!inputValue) {
    return false;
  }

  return true;
});

const crudModule = apiRetrieverOptions.crudModule;

// FindOne query for the currently selected value
const activeResourceQuery = useQuery({
  queryKey: computed(() => [
    ...unref(crudModule.baseQueryKeys),
    'detail',
    unref(value),
  ]),
  queryFn: () => crudModule.getOne(unref(value) as string),
  enabled: computed(() => !!unref(value)),
});

const activeResourceData = activeResourceQuery.data;

const activeItem = computed(() => {
  if (activeResourceData.value)
    return apiRetrieverOptions.transformer(activeResourceData.value);
  return null;
});

const searchValue = defineModel('search', { default: '' });

const searchOptions = computed(() => {
  let consideredSearch = unref(searchValue);
  if (activeItem.value && activeItem.value.label === consideredSearch)
    consideredSearch = '';
  return { search: consideredSearch };
});

// List query for dropdown options
const listQuery = useQuery({
  queryKey: computed(() => [
    ...unref(crudModule.baseQueryKeys),
    'list',
    JSON.stringify(unref(searchOptions)),
  ]),
  queryFn: () => crudModule.list(unref(searchOptions)),
  staleTime: 0,
});

const listItems = computed(() => listQuery.data.value?.data ?? []);
const listIsLoading = listQuery.isLoading;

const selectItems = computed(() => {
  const listItemsValue = unref(listItems) ?? [];
  const rawActiveResourceData = unref(activeResourceData);

  const combinedItems = filter(
    [rawActiveResourceData, ...listItemsValue],
    Boolean
  );
  const transformed = combinedItems.map(apiRetrieverOptions.transformer);
  return uniqBy(transformed, 'value');
});

const isLoading = computed(() => unref(propIsLoading) || unref(listIsLoading));

const isFilterEnabled = computed(() => {
  if (
    activeItem.value &&
    searchValue.value.trim() === activeItem.value.label.trim()
  )
    return false;
  return true;
});

const isFilterDisabled = computed(() => !isFilterEnabled.value);
</script>

<template>
  <UIFormOptionFieldsAutocomplete
    v-if="isLoading && selectItems.length === 0"
    v-model:search="searchValue"
    v-bind="$attrs"
    placeholder="Carregando..."
    :items="[]"
  />

  <UIFormOptionFieldsAutocomplete
    v-else-if="selectItems.length === 0"
    v-model:search="searchValue"
    v-bind="$attrs"
    placeholder="Carregando..."
    :items="[]"
  />

  <VVAutocomplete
    v-else
    v-model:search="searchValue"
    :items="selectItems"
    :name="name"
    :no-filter="isFilterDisabled"
    v-bind="$attrs"
  />
</template>
