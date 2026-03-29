<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { ambienteFindAll, ambienteFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};

defineProps<Props>();

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['ambientes'],
  list: (data: any, contextCampiRef: any) => {
    const contextCampi = unref(contextCampiRef);
    return api.call(ambienteFindAll, {
      query: {
        ...data,
        filterBlocoCampusId: contextCampi ? [contextCampi] : undefined,
      },
    });
  },
  getOne: (id: string) => api.call(ambienteFindById, { path: { id } }),
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
    label="Ambiente"
    placeholder="Selecione um ambiente"
    v-bind="$attrs"
  />
</template>
