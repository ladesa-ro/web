<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import {
  disciplinaFindAll,
  disciplinaFindById,
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
  baseQueryKeys: ['disciplinas'],
  list: (data: any) => api.call(disciplinaFindAll, { query: data }),
  getOne: (id: string) => api.call(disciplinaFindById, { path: { id } }),
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
    label="Disciplina"
    placeholder="Selecione uma disciplina"
    v-bind="$attrs"
  />
</template>
