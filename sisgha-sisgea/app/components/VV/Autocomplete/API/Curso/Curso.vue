<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};

const { name } = defineProps<Props>();

//

const { crudModule } = useLadesaApiCrudCursos();

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: item => ({
    value: item.id,
    label: item.nome,
  }),
});

//
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Curso"
    placeholder="Selecione um curso"
    v-bind="$attrs"
  />
</template>
