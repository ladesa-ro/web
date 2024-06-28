<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const search = ref('');

const { name } = toRefs(props);

const { cursosDebounced: cursos } = await useApiCursosFindAll(search);
</script>

<template>
  <VVAutocomplete
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
