<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { blocoFindAll, blocoFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['blocos'],
  list: (data: any, contextCampiRef: any) => {
    const contextCampi = unref(contextCampiRef);
    return api.call(blocoFindAll, {
      query: {
        ...data,
        filterCampusId: contextCampi ? [contextCampi] : undefined,
      },
    });
  },
  getOne: (id: string) => api.call(blocoFindById, { path: { id } }),
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
    label="Bloco"
    placeholder="Selecione um bloco"
    v-bind="$attrs"
  />
</template>
