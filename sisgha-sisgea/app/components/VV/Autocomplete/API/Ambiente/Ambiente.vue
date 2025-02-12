<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { useLadesaApiCrudAmbientes } from '../../../../../composables/integrations/ladesa-api/modules/modules';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const { crudModule } = useLadesaApiCrudAmbientes();

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
    label="Ambiente"
    placeholder="Selecione um ambiente"
    v-bind="$attrs"
  />
</template>
