<script lang="ts" setup>
import { useQueries, useQuery } from '@tanstack/vue-query';
import { filter, uniqBy } from 'lodash-es';
import { useField } from 'vee-validate';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

type Props = {
  name: string;
  isLoading?: boolean;
  disabled?: boolean;
  options: IUIAutocompleteApiRetrieverOptions;
  getValue?: (item: any) => string | number;
  buildItem?: (value: string | number) => any;
};

const props = withDefaults(defineProps<Props>(), {
  getValue: (item: any) => item?.id ?? item,
  buildItem: (value: string | number) => ({ id: String(value) }),
});

const { name, isLoading: propIsLoading, options: apiRetrieverOptions } = props;

const fieldDisabled = useFieldDisabled(() => props.disabled);

const { value } = useField<Array<any>>(name);

const crudModule = apiRetrieverOptions.crudModule;

const selectedIds = computed(() =>
  (value.value ?? []).map(props.getValue).filter(Boolean)
);

// getOne per selected item (like single API.vue does)
const activeResourcesQueries = useQueries({
  queries: computed(() =>
    selectedIds.value.map(id => ({
      queryKey: [...unref(crudModule.baseQueryKeys), 'detail', id],
      queryFn: () => crudModule.getOne(String(id)),
      enabled: !!id,
    }))
  ),
});

const activeItems = computed(() =>
  activeResourcesQueries.value
    .map(q => q.data)
    .filter(Boolean)
);

const searchValue = defineModel('search', { default: '' });

const searchOptions = computed(() => {
  return { search: unref(searchValue) || '' };
});

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
  const combined = filter(
    [...activeItems.value, ...listItems.value],
    Boolean
  );
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
    :disabled="fieldDisabled"
    :items="[]"
    :selected-options="[]"
  />

  <UIFormOptionFieldsAutocompleteMultiple
    v-else-if="selectItems.length === 0"
    v-model:search-term="searchValue"
    v-bind="$attrs"
    placeholder="Carregando..."
    :disabled="fieldDisabled"
    :items="[]"
    :selected-options="[]"
  />

  <VVAutocompleteMultiple
    v-else
    v-model:search="searchValue"
    :items="selectItems"
    :name="name"
    :disabled="fieldDisabled"
    :get-value="getValue"
    :build-item="buildItem"
    v-bind="$attrs"
  />
</template>
