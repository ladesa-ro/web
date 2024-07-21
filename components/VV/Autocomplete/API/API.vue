<script lang="ts" setup generic="T extends any = any">
import {
  QuerySuspenseBehaviourMode,
  useApiBaseResourceList,
} from '../../../../integrations';
import type { IUIAutocompleteApiRetrieverOptions } from './-Base';

type Props = {
  name: string;
  isLoading?: boolean;
  options: IUIAutocompleteApiRetrieverOptions<T>;
};

const props = defineProps<Props>();
const name = toRef(props, 'name');

const apiRetrieverOptions = props.options;

const searchValue = defineModel('search', { default: '' });

const searchOptions = computed(() => ({
  search: unref(searchValue),
}));

const { isLoading: queryIsLoading, previousItems } =
  await useApiBaseResourceList(
    apiRetrieverOptions.baseQueryKey,
    apiRetrieverOptions.apiBaseResourceListRetriever,
    searchOptions,
    { mode: QuerySuspenseBehaviourMode.NEVER_WAIT }
  );

const isLoading = computed(
  () => unref(props.isLoading) || unref(queryIsLoading)
);
</script>

<template>
  <template v-if="isLoading && !previousItems">
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

  <template v-else-if="!previousItems">
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
      :items="previousItems"
      item-value="id"
      item-title="nome"
      v-model:search="searchValue"
      v-bind="$attrs"
    />
  </template>
</template>
