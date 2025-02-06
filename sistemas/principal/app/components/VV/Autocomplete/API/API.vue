<script lang="ts" setup generic="Typings extends IGenericCrudModuleTypes">
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import { useField } from 'vee-validate';
import { QuerySuspenseBehaviourMode } from '~/utils';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

//

type Props = {
  name: string;
  isLoading?: boolean;
  options: IUIAutocompleteApiRetrieverOptions<Typings>;
};

const props = defineProps<Props>();

const name = toRef(props, 'name');
const apiRetrieverOptions = props.options;

//

const { value } = useField(name);

const { useListQuery, useFindOneQuery } = useGenericCrudComposables(
  apiRetrieverOptions.crudModule
);

const { data: activeResourceData } = await useFindOneQuery(
  computed(() => unref(value))
);

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

const { isLoading: listIsLoading, previousItems } = await useListQuery(
  searchOptions,
  { mode: QuerySuspenseBehaviourMode.NEVER_WAIT }
);

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

const isLoading = computed(
  () => unref(props.isLoading) || unref(listIsLoading)
);

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
        clearable
        hide-details="auto"
        persistent-placeholder
        :name="name"
        v-bind="$attrs"
        disabled=""
        placeholder="Carregando..."
      />
    </div>
  </template>

  <template v-else-if="!items">
    <UIAutocompleteBase
      v-model:search="searchValue"
      clearable
      hide-details="auto"
      persistent-placeholder
      :name="name"
      v-bind="$attrs"
      disabled=""
      placeholder="Carregando..."
    />
  </template>

  <template v-else>
    <VVAutocomplete
      v-model:search="searchValue"
      :name="name"
      :items="items"
      item-value="value"
      item-title="label"
      :no-filter="isFilterDisabled"
      v-bind="$attrs"
    />
  </template>
</template>
