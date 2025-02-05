<script setup lang="ts">
import type { AmbienteFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { useLadesaApiCrudAmbientes } from '../../../../../composables/integrations/ladesa-api/modules/modules';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const {
  crudModule,
  composables: { useList, useGetOne },
} = useLadesaApiCrudAmbientes();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: crudModule.baseQueryKeys,

  apiResourceListRetriever: useList(),
  apiResourceGetRetriever: useGetOne(),

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
