<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const apiClient = useApiClient();
const crudModule = {
  baseQueryKeys: ['ambientes'],
  list: (data: any, contextCampiRef: any) => {
    const contextCampi = unref(contextCampiRef);
    return apiClient.ambientes.ambienteFindAll({
      ...data,
      filterBlocoCampusId: contextCampi ? [contextCampi] : undefined,
    });
  },
  getOne: (id: string) => apiClient.ambientes.ambienteFindById({ id }),
};

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
    label="Ambiente"
    placeholder="Selecione um ambiente"
    v-bind="$attrs"
  />
</template>
