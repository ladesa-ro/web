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

const { value } = useField(name);

const { useListQuery, useFindOneQuery } = useGenericCrudComposables(
  apiRetrieverOptions.crudModule
);

const { data: activeResourceData, suspense } = useFindOneQuery(
  computed(() => unref(value))
);
await suspense();

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

const {
  queryStatus: { isLoading: listIsLoading },
  data: { items: listItems },
} = useListQuery(searchOptions);

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
