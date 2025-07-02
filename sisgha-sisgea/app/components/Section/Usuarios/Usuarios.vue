<script lang="ts" setup>
const searchBarText = ref('');
</script>

<template>
  <!-- TODO: transformar esse layout em componente -->
  <UIContainer class="flex flex-col gap-11">
    <div class="flex justify-between">
      <UISearchBar v-model="searchBarText" />
      <SectionUsuariosModalsForm />
    </div>

    <SectionUsuariosGrid :search-bar-text="searchBarText" />
  </UIContainer>
</template>
