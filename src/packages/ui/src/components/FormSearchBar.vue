<script setup lang="ts">
import FormTextField from './FormTextField.vue';

const value = defineModel<string>({ required: false, default: '' });
</script>

<template>
  <FormTextField
    v-model="value"
    name="pesquisar"
    label="Pesquisar"
    placeholder="Digite aqui"
    class="ui-search-bar"
  />
</template>
