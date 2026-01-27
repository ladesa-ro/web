<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
  filter?: Record<string, any>;
};
const props = defineProps<Props>();
const { name, filter } = toRefs(props);

//

const { crudModule } = useLadesaApiCrudCalendarioLetivo();

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,
  transformer: item => ({
    value: item.id,
    label: item.nome || item.slug || `Calendário ${item.id.substring(0, 5)}`,
  }),
  filter: computed(() => filter.value),
});

//
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    :filter="filter"
    label="Calendário"
    placeholder="Selecione um calendário"
    v-bind="$attrs"
  />
</template>
