<script setup lang="ts">
import { toRefs } from 'vue';
import {
  modalidadesBaseQueryKey,
  useModalidadesRetriever,
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

const modalidadesRetriever = useModalidadesRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: modalidadesBaseQueryKey,
  apiBaseResourceListRetriever: modalidadesRetriever,
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Modalidade"
    item-value="id"
    item-title="nome"
    placeholder="Selecione uma modalidade"
    v-bind="$attrs"
  />
</template>
