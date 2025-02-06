<script setup lang="ts">
import type { OfertaFormacaoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const { crudModule } = useLadesaApiCrudOfertasFormacoes();

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: (item) => ({
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
    label="Oferta de Formação"
    placeholder="Selecione uma oferta de formação"
    v-bind="$attrs"
  />
</template>
