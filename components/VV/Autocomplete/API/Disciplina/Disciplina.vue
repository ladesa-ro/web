<script setup lang="ts">
import { toRefs } from 'vue';
import {
  disciplinasBaseQueryKey,
  useDisciplinasRetriever,
} from '~/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const disciplinasRetriever = useDisciplinasRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: disciplinasBaseQueryKey,
  apiBaseResourceListRetriever: disciplinasRetriever,
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Disciplina"
    item-value="id"
    item-title="nome"
    placeholder="Selecione uma disciplina"
    v-bind="$attrs"
  />
</template>
