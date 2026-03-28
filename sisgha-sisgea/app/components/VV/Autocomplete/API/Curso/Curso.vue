<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { cursoFindAll, cursoFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};

defineProps<Props>();

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: ['cursos'],
  list: (data: any, contextCampiRef: any) => {
    const contextCampi = unref(contextCampiRef);
    return api.call(cursoFindAll, {
      query: {
        ...data,
        filterCampusId: contextCampi ? [contextCampi] : undefined,
      },
    });
  },
  getOne: (id: string) => api.call(cursoFindById, { path: { id } }),
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
    label="Curso"
    placeholder="Selecione um curso"
    v-bind="$attrs"
  />
</template>
