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
  baseQueryKeys: ['ofertas-formacoes'],
  list: (data: any) => apiClient.ofertasFormacoes.ofertaFormacaoFindAll(data),
  getOne: (id: string) =>
    apiClient.ofertasFormacoes.ofertaFormacaoFindById({ id }),
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
    label="Formação"
    placeholder="Selecione uma formação"
    v-bind="$attrs"
  />
</template>
