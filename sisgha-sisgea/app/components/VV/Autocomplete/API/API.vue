<script generic="Typings extends IGenericCrudModuleTypesBase" lang="ts" setup>
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import { useField } from 'vee-validate';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

//

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

//

const { value } = useField(name);

const { useListQuery, useFindOneQuery } = useGenericCrudComposables(
  apiRetrieverOptions.crudModule
);

const { data: activeResourceData, suspense } = useFindOneQuery(
  computed(() => unref(value))
);

await suspense();

const activeItem = computed(() => {
  if (activeResourceData.value) {
    return apiRetrieverOptions.transformer(activeResourceData.value);
  }

  return null;
});

//

const searchValue = defineModel('search', { default: '' });

const searchOptions = computed(() => {
  let consideredSearch = unref(searchValue);

  if (activeItem.value) {
    if (activeItem.value.label === consideredSearch) {
      consideredSearch = '';
    }
  }

  return {
    search: consideredSearch,
  };
});

const { isLoading: listIsLoading, previousItems } = useListQuery(searchOptions);

//

const items = computed(() => {
  const rawPreviousItems = unref(previousItems);
  const rawActiveResourceData = unref(activeResourceData);

  if (!rawPreviousItems && !rawActiveResourceData) {
    return null;
  }

  const combinedItems = filter(
    [rawActiveResourceData, ...(rawPreviousItems ?? [])],
    Boolean
  );

  const transformedCombinedItems = combinedItems.map(
    apiRetrieverOptions.transformer
  );

  const uniqueTransformed = uniqBy(transformedCombinedItems, 'value');

  return uniqueTransformed;
});

//

const isLoading = computed(() => unref(propIsLoading) || unref(listIsLoading));

const isFilterEnabled = computed(() => {
  if (activeItem.value) {
    if (searchValue.value.trim() === activeItem.value.label.trim()) {
      return false;
    }
  }

  return true;
});

const isFilterDisabled = computed(() => !isFilterEnabled.value);

//
</script>

<template>
  <template v-if="isLoading && !items">
    <div class="autoCompleteField">
      <UIAutocompleteBase
        v-model:search="searchValue"
        :name="name"
        clearable
        disabled=""
        hide-details="auto"
        persistent-placeholder
        placeholder="Carregando..."
        v-bind="$attrs"
      />
    </div>
  </template>

  <template v-else-if="!items">
    <UIAutocompleteBase
      v-model:search="searchValue"
      :name="name"
      clearable
      disabled=""
      hide-details="auto"
      persistent-placeholder
      placeholder="Carregando..."
      v-bind="$attrs"
    />
  </template>

  <template v-else>
    <VVAutocomplete
      v-model:search="searchValue"
      :items="items"
      :name="name"
      :no-filter="isFilterDisabled"
      item-title="label"
      item-value="value"
      v-bind="$attrs"
    />
  </template>
</template>
