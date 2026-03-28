<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import {
  modalidadeFindAll,
  modalidadeFindById,
} from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['modalidades'],
  list: (data: any) => api.call(modalidadeFindAll, { query: data }),
  getOne: (id: string) => api.call(modalidadeFindById, { path: { id } }),
};

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: item => ({
    value: item.id,
    label: item.nome,
  }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Modalidade"
    placeholder="Selecione uma modalidade"
    v-bind="$attrs"
  />
</template>
