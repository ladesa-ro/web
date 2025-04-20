<script lang="ts" setup>
const roles = [
  { value: 'professor', label: 'Professor' },
  { value: 'dape', label: 'DAPE' },
];
</script>

<template>
  <UIFormOptionFieldsAutocomplete
    label="Função"
    placeholder="Selecione"
    :items="roles"
  />
</template>
