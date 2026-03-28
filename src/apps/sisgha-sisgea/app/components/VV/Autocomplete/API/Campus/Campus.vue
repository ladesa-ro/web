<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { campusFindAll, campusFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['campi'],
  list: (data: any) => api.call(campusFindAll, { query: data }),
  getOne: (id: string) => api.call(campusFindById, { path: { id } }),
};

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
