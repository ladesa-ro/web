<script setup lang="ts">
import type { ModalidadeFindOneResultView } from "@ladesa-ro/api-client-fetch";
import { toRefs } from "vue";
import { modalidadesBaseQueryKey, useModalidadeGetRetriever, useModalidadesRetriever } from "~/integrations/api";
import { createUIAutocompleteApiRetrieverOptions } from "../-Base";

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const modalidadesRetriever = useModalidadesRetriever();
const modalidadeGetRetriever = useModalidadeGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: modalidadesBaseQueryKey,

  apiResourceGetRetriever: modalidadeGetRetriever,
  apiResourceListRetriever: modalidadesRetriever,

  transformer: (item: ModalidadeFindOneResultView) => ({
    value: item.id,
    label: item.slug,
  }),
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Modalidade"
    placeholder="Selecione uma modalidade"
    v-bind="$attrs"
  />
</template>
