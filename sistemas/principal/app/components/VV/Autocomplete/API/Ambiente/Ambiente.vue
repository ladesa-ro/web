<script setup lang="ts">
import type { AmbienteFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  ambientesBaseQueryKey,
  useAmbienteGetRetriever,
  useAmbientesRetriever,
} from '~/utils';
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
const ambienteGetRetriever = useAmbienteGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: ambientesBaseQueryKey,

  apiResourceListRetriever: ambientesRetriever,
  apiResourceGetRetriever: ambienteGetRetriever,

  transformer: (item: AmbienteFindOneResultView) => ({
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
    label="Ambiente"
    placeholder="Selecione um ambiente"
    v-bind="$attrs"
  />
</template>
