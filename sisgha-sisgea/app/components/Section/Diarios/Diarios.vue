<script lang="ts" setup>
const searchBarText = ref('');
</script>

<template>
  <v-container>
    <div class="container mx-auto max-w-[89%]">
      <div
        class="container-header mx-auto justify-between items-center flex mb-5 gap-4 px-3"
      >
        <UISearchBar v-model="searchBarText"/>

        <div class="flex items-center shrink-0">
          <LazySectionDiariosModal />
        </div>
      </div>
      <div>
        <SectionDiariosGrid :search-bar-text="searchBarText" />
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.container-header {
  padding: 50px 0;
}
</style>
