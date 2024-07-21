<script setup lang="ts">
import { toRefs } from 'vue';
import { QuerySuspenseBehaviourMode } from '../../../integrations';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: false,
  },
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
  <template v-if="isLoading">
    <div class="autoCompleteField">
      <UIAutocompleteBase
        clearable
        hide-details="auto"
        persistent-placeholder
        :name="name"
        label="Curso"
        v-model:search="search"
        disabled=""
        placeholder="Carregando..."
        v-bind="$attrs"
      />
    </div>
  </template>

  <template v-else-if="!cursos">
    <UIAutocompleteBase
      clearable
      hide-details="auto"
      persistent-placeholder
      :name="name"
      label="Curso"
      v-model:search="search"
      disabled=""
      placeholder="Buscando por cursos..."
      v-bind="$attrs"
    />
  </template>

  <template v-else>
    <VVAutocomplete
      :name="name"
      label="Curso"
      :items="cursos"
      item-value="id"
      item-title="nome"
      v-model:search="search"
      placeholder="Selecione um curso"
      v-bind="$attrs"
    />
  </template>
</template>
