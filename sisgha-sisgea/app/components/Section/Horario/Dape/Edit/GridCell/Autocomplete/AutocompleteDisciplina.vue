<script setup lang="ts">
defineProps<{ disabled?: boolean }>();

const disciplinas = useDisciplinas();
const { isError, isLoading, data: disciplinasData, suspense } = disciplinas.list();
await suspense();

const disciplinasParsedItems = computed<ParsedItem[]>(() =>
  disciplinasData.value
    ? disciplinasData.value.data.map(disciplina => ({
        value: disciplina.id,
        label: disciplina.nome,
      }))
    : [],
);
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
