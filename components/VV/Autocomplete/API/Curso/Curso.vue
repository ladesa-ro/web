<script setup lang="ts">
import { toRefs } from 'vue';
import { cursosBaseQueryKey, useCursosRetriever } from '~/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const cursosRetriever = useCursosRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: cursosBaseQueryKey,
  apiBaseResourceListRetriever: cursosRetriever,
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Curso"
    item-value="id"
    item-title="nome"
    placeholder="Selecione um curso"
    v-bind="$attrs"
  />
</template>
