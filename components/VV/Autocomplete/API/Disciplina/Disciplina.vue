<script setup lang="ts">
import type { DisciplinaFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { toRefs } from 'vue';
import {
  disciplinasBaseQueryKey,
  useDisciplinaGetRetriever,
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
const disciplinaGetRetriever = useDisciplinaGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: disciplinasBaseQueryKey,

  apiResourceGetRetriever: disciplinaGetRetriever,
  apiResourceListRetriever: disciplinasRetriever,

  transformer: (item: DisciplinaFindOneResultDto) => ({
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
