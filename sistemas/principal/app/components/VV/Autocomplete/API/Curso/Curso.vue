<script setup lang="ts">
import type { CursoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  cursosBaseQueryKey,
  useCursoGetRetriever,
  useCursosRetriever,
} from '~/utils';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const cursosRetriever = useCursosRetriever();
const cursoGetRetriever = useCursoGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: cursosBaseQueryKey,

  apiResourceGetRetriever: cursoGetRetriever,
  apiResourceListRetriever: cursosRetriever,

  transformer: (item: CursoFindOneResultView) => ({
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
    label="Curso"
    placeholder="Selecione um curso"
    v-bind="$attrs"
  />
</template>
