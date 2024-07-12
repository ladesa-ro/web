<script setup lang="ts">
import { toRefs } from 'vue';
import { QuerySuspenseBehaviourMode } from '../../../integrations';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const { name } = toRefs(props);

const search = ref('');

const { previousItems: ambientes } = await useApiAmbientesFindAll(search, {
  mode: QuerySuspenseBehaviourMode.NEVER_WAIT,
});
</script>

<template>
  <VVAutocomplete
    v-if="!ambientes"
    :name="name"
    label="Ambiente"
    placeholder="Buscando por ambientes..."
    disabled=""
  />

  <VVAutocomplete
    v-else
    :name="name"
    item-value="id"
    label="Ambiente"
    v-bind="$attrs"
    item-title="nome"
    :items="ambientes"
    v-model:search="search"
    placeholder="Selecione um ambiente"
  />
</template>
