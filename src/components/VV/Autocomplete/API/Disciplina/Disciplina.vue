<script setup lang="ts">
import type { DisciplinaFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  disciplinasBaseQueryKey,
  useDisciplinaGetRetriever,
  useDisciplinasRetriever,
} from '~/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const disciplinasRetriever = useDisciplinasRetriever();
const disciplinaGetRetriever = useDisciplinaGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: disciplinasBaseQueryKey,

  apiResourceGetRetriever: disciplinaGetRetriever,
  apiResourceListRetriever: disciplinasRetriever,

  transformer: (item: DisciplinaFindOneResultView) => ({
    value: item.id,
    label: item.nome,
  }),
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Disciplina"
    placeholder="Selecione uma disciplina"
    v-bind="$attrs"
  />
</template>
