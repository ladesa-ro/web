<script setup lang="ts">
import type { BlocoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  blocosBaseQueryKey,
  useBlocoGetRetriever,
  useBlocosRetriever,
} from '~/utils';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const blocosRetriever = useBlocosRetriever();
const blocoGetRetriever = useBlocoGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: blocosBaseQueryKey,

  apiResourceGetRetriever: blocoGetRetriever,
  apiResourceListRetriever: blocosRetriever,

  transformer: (item: BlocoFindOneResultView) => ({
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
    label="Bloco"
    placeholder="Selecione um bloco"
    v-bind="$attrs"
  />
</template>
