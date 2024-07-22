<script lang="ts" setup generic="T extends any = any">
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import { useField } from 'vee-validate';
import {
  QuerySuspenseBehaviourMode,
  useApiBaseResourceGet,
  useApiBaseResourceList,
} from '../../../../integrations';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

//

type Props = {
  name: string;
  isLoading?: boolean;
  options: IUIAutocompleteApiRetrieverOptions<T>;
};

const props = defineProps<Props>();

const name = toRef(props, 'name');
const apiRetrieverOptions = props.options;

//

const searchValue = defineModel('search', { default: '' });

const searchOptions = computed(() => ({
  search: unref(searchValue),
}));

const { isLoading: listIsLoading, previousItems } =
  await useApiBaseResourceList(
    apiRetrieverOptions.baseQueryKey,
    apiRetrieverOptions.apiResourceListRetriever,
    searchOptions,
    { mode: QuerySuspenseBehaviourMode.NEVER_WAIT }
  );

//

const { value } = useField(name);

const { response: activeItemData } = useApiBaseResourceGet({
  id: computed(() => unref(value)),
  baseQueryKey: apiRetrieverOptions.baseQueryKey,
  apiResourceGetRetriever: apiRetrieverOptions.apiResourceGetRetriever,
});

//

const items = computed(() => {
  const rawPreviousItems = unref(previousItems);
  const rawActiveItemData = unref(activeItemData);

  if (!rawPreviousItems && !rawActiveItemData) {
    return null;
  }

  const combinedItems = filter(
    [rawActiveItemData, ...(rawPreviousItems ?? [])],
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

//
</script>

<template>
  <template v-if="isLoading && !items">
    <div class="autoCompleteField">
      <UIAutocompleteBase
        clearable
        hide-details="auto"
        persistent-placeholder
        :name="name"
        v-model:search="searchValue"
        v-bind="$attrs"
        disabled=""
        placeholder="Carregando..."
      />
    </div>
  </template>

  <template v-else-if="!items">
    <UIAutocompleteBase
      clearable
      hide-details="auto"
      persistent-placeholder
      :name="name"
      v-model:search="searchValue"
      v-bind="$attrs"
      disabled=""
      placeholder="Carregando..."
    />
  </template>

  <template v-else>
    <VVAutocomplete
      :name="name"
      :items="items"
      item-value="value"
      item-title="label"
      v-model:search="searchValue"
      v-bind="$attrs"
    />
  </template>
</template>
