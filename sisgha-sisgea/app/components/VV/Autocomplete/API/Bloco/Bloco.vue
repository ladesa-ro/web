<script setup lang="ts">
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const { crudModule } = useLadesaApiCrudBlocos();

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
    label="Bloco"
    placeholder="Selecione um bloco"
    v-bind="$attrs"
  />
</template>
