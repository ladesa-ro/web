<script lang="ts" setup>
const searchBarText = ref('');
</script>

<template>
  <!-- TODO: transformar esse layout em componente -->
  <UIContainer>
    <div class="flex justify-between gap-5 mb-10">
      <UISearchBar v-model="searchBarText" />
      <SectionUsuariosModalsForm />
    </div>

    <SectionUsuariosGrid :search-bar-text="searchBarText" />
  </UIContainer>
</template>
