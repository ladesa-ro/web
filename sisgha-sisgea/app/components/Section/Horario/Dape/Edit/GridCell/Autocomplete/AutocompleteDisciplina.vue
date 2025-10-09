<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

defineProps<{ disabled?: boolean }>();

const {
  isError,
  isLoading,
  promise,
} = useQuery(listDisciplinas());

const disciplinasList = await promise.value;

const disciplinasParsedItems: ParsedItem[] = disciplinasList
  ? disciplinasList.data.map(disciplina => ({
      value: disciplina.id,
      label: disciplina.nome,
    }))
  : [];
</script>

<template>
  <UIFormOptionFieldsAutocomplete
    v-if="isLoading || isError"
    v-bind="$attrs"
    :disabled="true"
    :items="[]"
    label="Disciplina"
    :placeholder="isLoading ? 'Carregando...' : 'Ocorreu um erro inesperado.'"
  />

  <VVAutocomplete
    v-else
    v-bind="$attrs"
    :items="disciplinasParsedItems"
    :disabled
    name="disciplina.id"
    label="Disciplina"
    placeholder="Selecione uma disciplina"
  />
</template>
