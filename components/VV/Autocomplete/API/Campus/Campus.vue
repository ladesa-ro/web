<script setup lang="ts">
import { toRefs } from 'vue';
import { campiBaseQueryKey, useCampiRetriever } from '~/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const campiRetriever = useCampiRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: campiBaseQueryKey,
  apiBaseResourceListRetriever: campiRetriever,
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Campus"
    item-value="id"
    item-title="apelido"
    placeholder="Selecione um campus"
    v-bind="$attrs"
  />
</template>
