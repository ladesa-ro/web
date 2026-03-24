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
  baseQueryKeys: ['modalidades'],
  list: (data: any) => apiClient.modalidades.modalidadeFindAll(data),
  getOne: (id: string) => apiClient.modalidades.modalidadeFindById({ id }),
} as any;

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
