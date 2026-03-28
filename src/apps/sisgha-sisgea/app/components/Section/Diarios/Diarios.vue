<script lang="ts" setup>
const searchBarText = ref('');
</script>

<template>
  <UIContainer>
    <div class="flex justify-between items-center mb-10 gap-5">
      <UISearchBar v-model="searchBarText" />
      <LazySectionDiariosModal />
    </div>

    <SectionDiariosGrid :search-bar-text="searchBarText" />
  </UIContainer>
</template>
