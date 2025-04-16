<script lang="ts" setup>
const value = defineModel<string>({ required: false, default: '' });
</script>

<template>
  <UIFormTextField v-model="value" label="Pesquisar" placeholder="Digite aqui" class="max-w-[30rem]">
    <IconsIconSearch />
  </UIFormTextField>
</template>
