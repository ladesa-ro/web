<script lang="ts" setup>
const searchBarText = ref('');
</script>

<template>
  <v-container>
    <!-- TODO: transformar esse layout em componente -->
    <div class="container mx-auto py-4 max-w-[89%]">
      <div
        class="flex container-header mx-auto justify-between items-center mb-5 gap-4 px-3"
      >
        <UISearchBar v-model="searchBarText" />

        <div class="flex items-center shrink-0">
          <SectionUsuariosModalsForm />
        </div>
      </div>

      <SectionUsuariosGrid :search-bar-text="searchBarText" />
    </div>
  </v-container>
</template>
<style scoped>
.container-header {
  padding: 50px 0;
}
</style>
