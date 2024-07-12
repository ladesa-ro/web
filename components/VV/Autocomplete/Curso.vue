<script setup lang="ts">
import { toRefs } from 'vue';
import { QuerySuspenseBehaviourMode } from '../../../integrations';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const search = ref('');

const { name } = toRefs(props);

const { previousItems: cursos } = await useApiCursosFindAll(search, {
  mode: QuerySuspenseBehaviourMode.NEVER_WAIT,
});
</script>

<template>
  <VVAutocomplete
    v-if="!cursos"
    :name="name"
    label="Curso"
    :items="[]"
    placeholder="Buscando por cursos..."
    disabled=""
  />

  <VVAutocomplete
    v-else
    :name="name"
    label="Curso"
    :items="cursos"
    v-bind="$attrs"
    item-value="id"
    item-title="nome"
    v-model:search="search"
    placeholder="Selecione um curso"
  />
</template>
