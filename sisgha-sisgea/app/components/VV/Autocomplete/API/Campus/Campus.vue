<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const apiClient = useApiClient();
const crudModule = {
  baseQueryKeys: ['campi'],
  list: (data: any) => apiClient.campi.campusFindAll(data),
  getOne: (id: string) => apiClient.campi.campusFindById({ id }),
} as any;

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: item => ({
    value: item.id,
    label: item.apelido,
  }),
});

//
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Campus"
    placeholder="Selecione um campus"
    v-bind="$attrs"
  />
</template>
