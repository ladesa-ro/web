<script setup lang="ts">
import { toRefs } from 'vue';
import { blocosBaseQueryKey, useBlocosRetriever } from '~/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const blocosRetriever = useBlocosRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: blocosBaseQueryKey,
  apiBaseResourceListRetriever: blocosRetriever,
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Bloco"
    item-value="id"
    item-title="nome"
    placeholder="Selecione um bloco"
    v-bind="$attrs"
  />
</template>
