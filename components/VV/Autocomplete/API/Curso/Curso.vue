<script setup lang="ts">
import type { CursoFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { toRefs } from 'vue';
import {
  cursosBaseQueryKey,
  useCursoGetRetriever,
  useCursosRetriever,
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

const cursosRetriever = useCursosRetriever();
const cursoGetRetriever = useCursoGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: cursosBaseQueryKey,

  apiResourceGetRetriever: cursoGetRetriever,
  apiResourceListRetriever: cursosRetriever,

  transformer: (item: CursoFindOneResultDto) => ({
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
