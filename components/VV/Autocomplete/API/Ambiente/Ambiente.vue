<script setup lang="ts">
import { toRefs } from 'vue';
import {
  ambientesBaseQueryKey,
  useAmbientesRetriever,
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

const ambientesRetriever = useAmbientesRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: ambientesBaseQueryKey,
  apiBaseResourceListRetriever: ambientesRetriever,
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Ambiente"
    item-value="id"
    item-title="nome"
    placeholder="Selecione um ambiente"
    v-bind="$attrs"
  />
</template>
