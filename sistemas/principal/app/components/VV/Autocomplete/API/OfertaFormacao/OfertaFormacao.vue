<script setup lang="ts">
import type { OfertaFormacaoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  ofertasformacoesBaseQueryKey,
  useOfertaFormacaoGetRetriever,
  useOfertasFormacoesRetriever,
} from '~~/app/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const OfertasFormacoesRetriever = useOfertasFormacoesRetriever();
const OfertaFormacaoGetRetriever = useOfertaFormacaoGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: ofertasformacoesBaseQueryKey,

  apiResourceGetRetriever: OfertaFormacaoGetRetriever,
  apiResourceListRetriever: OfertasFormacoesRetriever,

  transformer: (item: OfertaFormacaoFindOneResultView) => ({
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
