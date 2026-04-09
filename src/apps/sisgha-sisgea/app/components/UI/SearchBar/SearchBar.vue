<script lang="ts" setup>
const value = defineModel<string>({ required: false, default: '' });
</script>

<template>
  <UIFormTextField
    v-model="value"
    name="pesquisar"
    label="Pesquisar"
    placeholder="Digite aqui"
    class="w-full"
  >
    <IconsSearch />
  </UIFormTextField>
</template>
