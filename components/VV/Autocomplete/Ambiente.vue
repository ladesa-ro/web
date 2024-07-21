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

const { name } = toRefs(props);

const search = ref('');

const { previousItems: ambientes } = await useApiAmbientesFindAll(search, {
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
        label="Ambiente"
        v-model:search="search"
        disabled=""
        placeholder="Carregando..."
        v-bind="$attrs"
      />
    </div>
  </template>

  <template v-else-if="!ambientes">
    <UIAutocompleteBase
      clearable
      hide-details="auto"
      persistent-placeholder
      :name="name"
      label="Ambiente"
      v-model:search="search"
      disabled=""
      placeholder="Buscando por ambientes..."
      v-bind="$attrs"
    />
  </template>

  <template v-else>
    <VVAutocomplete
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
</template>
