<script setup lang="ts">
import type { BlocoFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { toRefs } from 'vue';
import {
  blocosBaseQueryKey,
  useBlocoGetRetriever,
  useBlocosRetriever,
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

const blocosRetriever = useBlocosRetriever();
const blocoGetRetriever = useBlocoGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: blocosBaseQueryKey,

  apiResourceGetRetriever: blocoGetRetriever,
  apiResourceListRetriever: blocosRetriever,

  transformer: (item: BlocoFindOneResultDto) => ({
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
