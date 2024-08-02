<script setup lang="ts">
import type { CampusFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { toRefs } from 'vue';
import {
  campiBaseQueryKey,
  useCampiRetriever,
  useCampusGetRetriever,
} from '~/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

//

type Props = {
  isLoading?: boolean;
  name: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const campiRetriever = useCampiRetriever();
const campusGetRetriever = useCampusGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: campiBaseQueryKey,

  apiResourceGetRetriever: campusGetRetriever,
  apiResourceListRetriever: campiRetriever,

  transformer: (item: CampusFindOneResultDto) => ({
    value: item.id,
    label: item.apelido,
  }),
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Campus"
    placeholder="Selecione um campus"
    v-bind="$attrs"
  />
</template>
