<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};

defineProps<Props>();

//

const apiClient = useApiClient();
const crudModule = {
  baseQueryKeys: ['cursos'],
  list: (data: any, contextCampiRef: any) => {
    const contextCampi = unref(contextCampiRef);
    return apiClient.cursos.cursoFindAll({
      ...data,
      filterCampusId: contextCampi ? [contextCampi] : undefined,
    });
  },
  getOne: (id: string) => apiClient.cursos.cursoFindById({ id }),
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
