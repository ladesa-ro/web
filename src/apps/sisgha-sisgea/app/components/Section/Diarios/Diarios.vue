<script lang="ts" setup>
const searchBarText = ref('');
</script>

<template>
  <UIContainer>
    <div class="flex-1 h-full flex flex-col gap-10">
      <UIBreadcrumbDapeBreadcrumb />

      <div class="flex justify-between items-center mb-10 gap-5">
        <UISearchBar v-model="searchBarText" />
        <LazySectionDiariosModal />
      </div>

      <SectionDiariosGrid :search-bar-text="searchBarText" />
    </div>
  </UIContainer>
</template>
