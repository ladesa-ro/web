<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const { crudModule } = useLadesaApiCrudDisciplinas();

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
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Disciplina"
    placeholder="Selecione uma disciplina"
    v-bind="$attrs"
  />
</template>
