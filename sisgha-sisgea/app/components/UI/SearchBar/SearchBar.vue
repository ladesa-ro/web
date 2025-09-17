<script lang="ts" setup>
const value = defineModel<string>({ required: false, default: '' });
</script>

<template>
  <UIFormTextField
    v-model="value"
    name="pesquisar"
    label="Pesquisar"
    placeholder="Digite aqui"
    class="max-w-[30rem]"
  >
    <IconsSearch />
  </UIFormTextField>
</template>
